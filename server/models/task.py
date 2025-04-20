from models.task_status import TaskStatus
from models.message import Message
from models.artifact import Artifact
from typing import Any
from pydantic import BaseModel


class Task(BaseModel):
  id: str
  sessionId: str
  status: TaskStatus
  history: list[Message]
  artifacts: list[Artifact]
  metadata: dict[str, Any]
