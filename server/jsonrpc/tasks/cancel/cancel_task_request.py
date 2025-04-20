from models.task_id_params import TaskIdParams
from pydantic import BaseModel

class CancelTaskRequest(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  method: str = "tasks/cancel"
  params: TaskIdParams
