from pydantic import BaseModel
from models.part import Part
from typing import Any

class Message(BaseModel):
  role: str
  parts: list[Part]
  metadata: dict[str, Any] | None = None
