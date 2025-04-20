import requests
import time
from typing import AsyncGenerator
from google.adk.events.event import Event
from google.adk.agents.invocation_context import InvocationContext
from google.adk.agents import BaseAgent
from jsonrpc.tasks.send.send_task_request import SendTaskRequest
from jsonrpc.tasks.send.send_task_response import SendTaskResponse
from jsonrpc.tasks.get.get_task_request import GetTaskRequest
from jsonrpc.tasks.get.get_task_response import GetTaskResponse
from jsonrpc.tasks.cancel.cancel_task_request import CancelTaskRequest
from jsonrpc.tasks.cancel.cancel_task_response import CancelTaskResponse
from models.task_id_params import TaskIdParams
from models.agent_card import AgentCard
from models.task_send_params import TaskSendParams
from models.task_query_params import TaskQueryParams
from models.task import Task
from models.task_state import TaskState
from server.domain.agent.remote.model_converter import convert_adk_content_to_a2a_message, convert_a2a_message_to_adk_event


class RemoteAgent(BaseAgent):
  def __init__(
      self,
      name: str,
      description: str,
      endpoint: str
  ):
    super().__init__(
      name=name,
      description=description,
    )

    self.endpoint = endpoint
  
  def _get_agent_card(self) -> AgentCard:
    response = requests.get(f"{self.endpoint}/.well-known/agent.json")
    response.raise_for_status()
    return AgentCard(**response.json())

  async def _run_async_impl(
      self, ctx: InvocationContext
  ) -> AsyncGenerator[Event, None]:
    if not ctx.user_content:
      raise Exception("User content is required")

    id = ctx.invocation_id

    message = convert_adk_content_to_a2a_message(ctx.user_content)

    params = TaskSendParams(
      id=id,
      sessionId=ctx.session.id,
      message=message
    )

    task = self._send_task(params)
    history_length = 0
    
    while True:
      task = self._get_task(TaskQueryParams(id=task.id))

      new_history = task.history[history_length:]
      history_length = len(task.history)

      error_state = [
        TaskState.FAILED,
        TaskState.CANCELED,
      ]

      working_state = [
        TaskState.SUBMITTED,
        TaskState.WORKING,
      ]

      input_state = [
        TaskState.INPUT_REQUIRED,
      ]

      completed_state = [
        TaskState.COMPLETED,
      ]

      if task.status.state in error_state:
        raise Exception(task.status.message)
      
      if task.status.state in input_state:
        # TODO: support input state
        raise Exception("Input not supported yet")
      
      if task.status.state in working_state:
        if len(new_history) == 0:
          time.sleep(1)
          continue

        for message in new_history:
          event = convert_a2a_message_to_adk_event(message)
          event.partial = True
          yield event

        continue

      if task.status.state in completed_state:
        for message in new_history[:-1]:
          event = convert_a2a_message_to_adk_event(message)
          event.partial = True
          yield event

        last_message = new_history[-1]
        event = convert_a2a_message_to_adk_event(last_message)
        event.partial = False
        yield event
        break

      raise Exception(f"Unknown task state: {task.status.state}")

  def _send_task(self, params: TaskSendParams) -> Task:
    payload = SendTaskRequest(id=1, params=params)

    response = requests.post(self.endpoint, json=payload.model_dump())
    response.raise_for_status()

    response_model = SendTaskResponse(**response.json())

    if response_model.error:
      raise Exception(response_model.error.message)

    if response_model.result is None:
      raise Exception("Task not found")

    return response_model.result

  def _get_task(self, params: TaskQueryParams) -> Task:
    payload = GetTaskRequest(id=1, params=params)

    response = requests.post(self.endpoint, json=payload.model_dump())
    response.raise_for_status()

    response_model = GetTaskResponse(**response.json())

    if response_model.error:
      raise Exception(response_model.error.message)

    if response_model.result is None:
      raise Exception("Task not found")

    return response_model.result
    
  def _cancel_task(self, params: TaskIdParams) -> Task:
    payload = CancelTaskRequest(id=1, params=params)

    response = requests.post(self.endpoint, json=payload.model_dump())
    response.raise_for_status()

    response_model = CancelTaskResponse(**response.json())

    if response_model.error:
      raise Exception(response_model.error.message)

    if response_model.result is None:
      raise Exception("Task not found")

    return response_model.result
