from pydantic import BaseModel
from server.models.task_push_notification_config import TaskPushNotificationConfig


class SetTaskPushNotificationRequest(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  method: str = "tasks/pushNotification/set"
  params: TaskPushNotificationConfig

