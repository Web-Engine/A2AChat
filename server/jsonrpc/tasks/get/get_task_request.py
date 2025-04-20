from pydantic import BaseModel
from models.task_query_params import TaskQueryParams

class GetTaskRequest(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  method: str = "tasks/get"
  params: TaskQueryParams
