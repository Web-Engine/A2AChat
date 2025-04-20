from pydantic import BaseModel
from models.task import Task
from server.jsonrpc.common.jsonrpc_error import JSONRPCError

class GetTaskResponse(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  result: Task | None = None
  error: JSONRPCError | None = None
