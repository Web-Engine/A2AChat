from models.message import Message
from typing import Any
from pydantic import BaseModel
from models.push_notification_config import PushNotificationConfig


class TaskSendParams(BaseModel):
  id: str
  sessionId: str | None = None
  message: Message
  historyLength: int | None = None
  pushNotification: PushNotificationConfig | None = None
  metadata: dict[str, Any] | None = None
