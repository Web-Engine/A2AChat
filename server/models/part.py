from typing import Annotated, Any, Literal, Union
from pydantic import BaseModel, Field


class TextPart(BaseModel):
  type: Literal["text"] = "text"
  text: str
  metadata: dict[str, Any] | None = None


class FilePart(BaseModel):
  class File(BaseModel):
    name: str | None = None
    mimeType: str | None = None
    bytes: str | None = None
    uri: str | None = None

  type: Literal["file"] = "file"
  file: File
  metadata: dict[str, Any] | None = None


class DataPart(BaseModel):
  type: Literal["data"] = "data"
  data: dict[str, Any]
  metadata: dict[str, Any] | None = None

Part = Annotated[Union[TextPart, FilePart, DataPart], Field(discriminator="type")]
