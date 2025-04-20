from google.genai.types import Part as AdkPart, Content as AdkContent
from models.part import Part as A2APart, TextPart
from google.adk.events.event import Event as AdkEvent
from models.message import Message as A2AMessage

def convert_adk_part_to_a2a(part: AdkPart) -> A2APart:
  if part.text:
    return TextPart(
      type="text",
      text=part.text,
    )
  
  # if part.file_data:
  #   return A2APart(
  #     type="file",
  #     file=part.file_data,
  #   )
  
  # if part.file_data:
  #   return A2APart(
  #     type="data",
  #     data=part.inline_data,
  #   )
  
  raise Exception(f"Not supported part type: {part}")

@staticmethod
def convert_a2a_part_to_adk(part: A2APart) -> AdkPart:
  if part.type == "text":
    return AdkPart.from_text(text=part.text)
  
  raise Exception(f"Not supported part type: {part}")


def convert_a2a_message_to_adk_event(message: A2AMessage) -> AdkEvent:
  return AdkEvent(
    author=message.role,
    content=convert_a2a_message_to_adk_content(message)
  )

def convert_a2a_message_to_adk_content(message: A2AMessage) -> AdkContent:
  parts = message.parts or []
  parts = [convert_a2a_part_to_adk(part) for part in parts]

  return AdkContent(
    parts=parts,
  )

def convert_adk_content_to_a2a_message(content: AdkContent) -> A2AMessage:
  role = content.role or "user"
  parts = content.parts or []
  parts = [convert_adk_part_to_a2a(part) for part in parts]

  return A2AMessage(
    role=role,
    parts=parts,
  )
