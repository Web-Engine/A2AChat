from pydantic import BaseModel
from server.jsonrpc.common.jsonrpc_error import JSONRPCError
from server.models.task_push_notification_config import TaskPushNotificationConfig

class SetTaskPushNotificationResponse(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  result: TaskPushNotificationConfig | None = None
  error: JSONRPCError | None = None
