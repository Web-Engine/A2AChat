from pydantic import BaseModel
from models.task_send_params import TaskSendParams

class SendTaskRequest(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  method: str = "tasks/send"
  params: TaskSendParams
