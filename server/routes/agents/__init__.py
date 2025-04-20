from fastapi import APIRouter, Request
from a2a.types import A2ARequest, AgentCapabilities, AgentCard, GetTaskRequest, SendTaskRequest, SendTaskStreamingRequest, CancelTaskRequest, SetTaskPushNotificationRequest, GetTaskPushNotificationRequest, TaskResubscriptionRequest
from domain.agent.remote.remote_agent import RemoteAgent

from google.adk.sessions import InMemorySessionService
from google.adk.memory import InMemoryMemoryService
from google.adk.runners import Runner

from server.domain.agent.remote.model_converter import convert_a2a_message_to_adk_content

router = APIRouter(prefix="/agents")

@router.get("/")
async def get_agents():
    return []

@router.post("/")
async def create_agent():
    return {}

@router.get("/{id}")
async def get_agent(id: str):
    return {}

@router.get("/.well-known/agents.json")
async def get_agents_json():
    return []

@router.get("/{id}/.well-known/agent.json")
async def get_agent_card(id: str) -> AgentCard:
    return AgentCard(
        version="1.0",
        name="Agent",
        description="Agent",
        url=f"https://localhost:8000/agent/{id}/rpc",
        capabilities=AgentCapabilities(
            streaming=False,
            pushNotifications=False,
            stateTransitionHistory=False,
        ),
        skills=[],
    )

@router.post("/{id}/rpc")
async def rpc(id: str, request: Request):
    request_body = await request.json()
    a2a_request = A2ARequest.validate_python(request_body)

    if isinstance(a2a_request, GetTaskRequest):
        pass
    elif isinstance(a2a_request, SendTaskRequest):
        agent = RemoteAgent(
            'Agent',
            'Agent',
            f'https://localhost:8001/'
        )

        session_service = InMemorySessionService()
        memory_service = InMemoryMemoryService()

        runner = Runner(
            app_name='Agent',
            agent=agent,
            session_service=session_service,
            memory_service=memory_service,
        )

        async for event in runner.run_async(
            user_id='user_id',
            session_id=a2a_request.params.sessionId,
            new_message=convert_a2a_message_to_adk_content(a2a_request.params.message),
        ):
            print(event)
        
    elif isinstance(a2a_request, SendTaskStreamingRequest):
        pass
    elif isinstance(a2a_request, CancelTaskRequest):
        pass
    elif isinstance(a2a_request, SetTaskPushNotificationRequest):
        pass
    elif isinstance(a2a_request, GetTaskPushNotificationRequest):
        pass
    elif isinstance(a2a_request, TaskResubscriptionRequest):
        pass 
    else:
        raise ValueError(f"Unexpected request type: {type(request)}")

    print(request_body)
    return {}


