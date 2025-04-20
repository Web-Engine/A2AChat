from models.artifact import Artifact
from pydantic import BaseModel
from typing import Any


class TaskArtifactUpdateEvent(BaseModel):
  id: str
  artifact: Artifact
  metadata: dict[str, Any] | None = None

