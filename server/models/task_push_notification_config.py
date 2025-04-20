from models.push_notification_config import PushNotificationConfig
from pydantic import BaseModel


class TaskPushNotificationConfig(BaseModel):
  id: str
  pushNotificationConfig: PushNotificationConfig
