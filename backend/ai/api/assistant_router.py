from fastapi import APIRouter
from assistant.assistant import Assistant
from starlette.responses import JSONResponse
from assistant.message_handler import MessageHandler
from assistant.assistant_request import AssistantRequest
from database.database import get_assistant_id

router = APIRouter(
    prefix="/api",
)


@router.post("/message")
async def send_message(request: AssistantRequest):
    assistant_id, thread_id = get_assistant_id(request.avatar_id)

    message_handler = MessageHandler(assistant_id, thread_id)
    content = message_handler.get_response(request.chat)

    return JSONResponse({"user_id": request.user_id, "content": content})


@router.get("/{user_id}")
async def create_assistant(user_id: str):
    assistant = Assistant()
    assistant_id = assistant.create_assistant(
        name="Math Tutor",
        instructions="You are a personal math tutor. Answer questions briefly, in a sentence or less."
    )
    thread_id = assistant.create_thread()

    # DB에 assistant_id, thread_id 저장 logic

    return JSONResponse({"assistant": assistant_id, "thread": thread_id})
