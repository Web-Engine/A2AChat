from pydantic import BaseModel
from server.jsonrpc.common.jsonrpc_error import JSONRPCError
from models.task import Task

class CancelTaskResponse(BaseModel):
  jsonrpc: str = "2.0"
  id: int | str | None = None
  result: Task | None = None
  error: JSONRPCError | None = None