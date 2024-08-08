from pydantic import BaseModel

class ModifyAssistantRequest(BaseModel):
    instruction: str
    name: str
    job: str
    residence: str
    assistant_id: str
