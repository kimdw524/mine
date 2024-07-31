from pydantic import BaseModel
from typing import Optional


class RegisterAssistantRequest(BaseModel):
    instruction: str


