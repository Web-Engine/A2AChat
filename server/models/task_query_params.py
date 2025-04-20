from pydantic import BaseModel
from typing import Any

class TaskQueryParams(BaseModel):
  id: str
  historyLength: int | None = None
  metadata: dict[str, Any] | None = None
