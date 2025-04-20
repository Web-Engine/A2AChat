from typing import Any
from pydantic import BaseModel

class TaskIdParams(BaseModel):
  id: str
  metadata: dict[str, Any] | None = None
