from models.part import Part
from typing import Any
from pydantic import BaseModel


class Artifact(BaseModel):
  name: str | None = None
  description: str | None = None
  parts: list[Part]
  metadata: dict[str, Any] | None = None
  index: int
  append: bool | None = None
  lastChunk: bool | None = None