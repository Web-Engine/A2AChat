from pydantic import BaseModel

class JSONRPCError(BaseModel):
    code: int
    message: str
    data: dict | None = None 
