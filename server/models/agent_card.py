from pydantic import BaseModel


class AgentCard(BaseModel):
  class Provider(BaseModel):
    organization: str;
    url: str;

  class Capabilities(BaseModel):
    streaming: bool | None = None;
    pushNotifications: bool | None = None;
    stateTransitionHistory: bool | None = None;
  
  class Authentication(BaseModel):
    schemes: list[str];
    credentials: str | None = None;
  
  class Skill(BaseModel):
    id: str;
    name: str;
    description: str;
    examples: list[str] | None = None;
    inputModes: list[str] | None = None;
    outputModes: list[str] | None = None;

  name: str;
  description: str;
  url: str;
  provider: Provider | None = None;
  version: str;
  documentationUrl: str | None = None;
  capabilities: Capabilities | None = None;
  authentication: Authentication | None = None;
  defaultInputModes: list[str];
  defaultOutputModes: list[str];
  skills: list[Skill];
