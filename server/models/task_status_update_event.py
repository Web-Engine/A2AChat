from models.task_status import TaskStatus
from typing import Any
from pydantic import BaseModel


class TaskStatusUpdateEvent(BaseModel):
  id: str
  status: TaskStatus
  final: bool
  metadata: dict[str, Any] | None = None
