from models.task_query_params import TaskQueryParams  
from pydantic import BaseModel

class TaskResubscriptionRequest(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  method: str = "tasks/resubscribe"
  params: TaskQueryParams
