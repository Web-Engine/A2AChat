from google.adk.agents import Agent


class LocalAgent:
  def __init__(
      self,
      name: str,
      description: str,
      model: str,
      instruction: str
  ):
    self.name = name
    self.description = description
    self.model = model
    self.instruction = instruction

    self.agent = Agent(
      name=name,
      description=description,
      model=model,
      instruction=instruction,
    )

  def create_task(self):
    pass

  def get_task(self):
    pass

  def cancel_task(self):
    pass
