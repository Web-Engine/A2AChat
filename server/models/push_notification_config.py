from pydantic import BaseModel


class PushNotificationConfig(BaseModel):
  class Authentication(BaseModel):
    schemes: list[str]
    credentials: str | None = None

  url: str
  token: str | None = None
  authentication: Authentication | None = None
