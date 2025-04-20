from models.task_id_params import TaskIdParams
from pydantic import BaseModel

class GetTaskPushNotificationRequest(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  method: str = "tasks/pushNotification/get"
  params: TaskIdParams
