from pydantic import BaseModel
from typing import Optional


class AssistantRequest(BaseModel):
    avatar_id: int
    user_id: str
    chat: Optional[str] = None
