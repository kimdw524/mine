from fastapi import APIRouter
from assistant.assistant import Assistant
from starlette.responses import JSONResponse
from assistant.message_handler import MessageHandler
from assistant.assistant_request import AssistantRequest
from assistant.register_assistant_request import RegisterAssistantRequest
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


@router.post("/avatar")
async def create_assistant(request: RegisterAssistantRequest):
    assistant = Assistant()
    assistant_id = assistant.create_assistant(
        name=request.name,
        instructions= "너는 내가 가정한 사람이 되어야 해. " + "너의 직업은 " + request.job + "이고 사는 지역은 " + request.residence + "이야." + " 너의 성격 기반은 다음과 같은 질의와 응답에 기반으로 답변해야 해. \n" + request.instruction
    )
    thread_id = assistant.create_thread()

    # DB에 assistant_id, thread_id 저장 logic

    return JSONResponse({"assistantId": assistant_id, "threadId": thread_id})
