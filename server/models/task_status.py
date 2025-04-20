from models.task_state import TaskState
from models.message import Message
from pydantic import BaseModel


class TaskStatus(BaseModel):
  state: TaskState
  message: Message | None = None
  timestamp: str | None = None
