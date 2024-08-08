from fastapi import APIRouter
from assistant.assistant import Assistant
from starlette.responses import JSONResponse
from assistant.message_handler import MessageHandler
from assistant.assistant_request import AssistantRequest
from assistant.modify_assistant_request import ModifyAssistantRequest
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
        instructions=f"""너는 사용자가 하는 모든 말을 기억하고 일정과 가계까지 관리해주는 사용자의 아바타야.
                            너에 대한 정보는 수정 될 수 있어.
                            대답은 요약해서 한 문장으로 끝내줘.
                            대답은 너의 성격과 MBTI에 맞게 말투를 바꿔서 대답 해 줘야 해.
                            대답은 지역에 따라 사투리를 사용할 수도 있어야 해.
                            오늘 날짜에 대한 정보도 같이 줄건데 필요한 경우가 아니면 사용자한테 안알려줘도 돼.
                            너의 직업은 ${request.job} 이야.
                            너가 사는 지역은 ${request.residence} 이야.
                            다음은 너에 대한 정보를 사용자가 입력한 거야. 너는 아래와 같은 정보를 기반으로 대답해야 돼.
                            ${request.instruction}
                            여기까지야.
                            """
    )

    thread_id = assistant.create_thread()

    # DB에 assistant_id, thread_id 저장 logic

    return JSONResponse({"assistantId": assistant_id, "threadId": thread_id})

@router.patch("/avatar")
async def update_assistant(request: ModifyAssistantRequest):
    assistant_id = request.assistant_id
    assistant = Assistant()
    assistant.update_assistant(
        assistant_id=assistant_id,

        instructions=f"""너는 사용자가 하는 모든 말을 기억하고 일정과 가계까지 관리해주는 사용자의 아바타야.
                            너에 대한 정보는 수정 될 수 있어.
                            대답은 요약해서 한 문장으로 끝내줘.
                            대답은 너의 성격과 MBTI에 맞게 말투를 바꿔서 대답 해 줘야 해.
                            대답은 지역에 따라 사투리를 사용할 수도 있어야 해.
                            오늘 날짜에 대한 정보도 같이 줄건데 필요한 경우가 아니면 사용자한테 안알려줘도 돼.
                            너의 직업은 ${request.job} 이야.
                            너가 사는 지역은 ${request.residence} 이야.
                            다음은 너에 대한 정보를 사용자가 입력한 거야. 너는 아래와 같은 정보를 기반으로 대답해야 돼.
                            ${request.instruction}
                            여기까지야.
                            """
    )

