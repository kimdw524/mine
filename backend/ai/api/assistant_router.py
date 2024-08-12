import json

from fastapi import APIRouter
from openai import NOT_GIVEN

from assistant.assistant import Assistant
from starlette.responses import JSONResponse
from assistant.message_handler import MessageHandler
from assistant.assistant_request import AssistantRequest
from assistant.modify_assistant_request import ModifyAssistantRequest
from assistant.register_assistant_request import RegisterAssistantRequest
from database.database import get_assistant_id
from datetime import datetime

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
                            사용자의 현재 날짜에 대한 정보도 같이 줄건데 필요한 경우가 아니면 사용자한테 안알려줘도 돼.
                            json으로 준다고 해서 응답을 json으로 주지마.
                            chatContent는 사용자가 너에게 묻는 거고 timestamp는 사용자의 시간이야.
                            """
    )

    thread_id = assistant.create_thread()

    sendedAt = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    chatContent = "너에 대한 사용자가 입력한 정보야. \n"
    chatContent += '' if request.name is None or request.name == '' else '너의 이름은 앞으로 ' + request.name + ' 야.\n'
    chatContent += '' if request.job is None or request.job == '' else '너의 직업은 앞으로 ' + request.job + ' 야 \n'
    chatContent += '' if request.residence is None or request.residence == '' else '너가 사는 곳은 앞으로 ' + request.residence + ' 야 \n'
    chatContent += '너에 대한 사용자가 입력한 설문이야. \n'
    chatContent += '' if request.instruction is None or request.instruction == '' else request.instruction

    send_message_to_assistant(chatContent=chatContent, timestamp=sendedAt, assistant_id=assistant_id, thread_id=thread_id)

    # DB에 assistant_id, thread_id 저장 logic

    return JSONResponse({"assistantId": assistant_id, "threadId": thread_id})

@router.put("/avatar")
async def update_assistant(request: ModifyAssistantRequest):
    assistant_id = request.assistant_id
    assistant = Assistant()
    assistant.update_assistant(
        assistant_id=assistant_id,
        name= NOT_GIVEN if request.name is None or request.name == '' else request.name,
        instruction=f"""너는 사용자가 하는 모든 말을 기억하고 일정과 가계까지 관리해주는 사용자의 아바타야.
                            너에 대한 정보는 수정 될 수 있어.
                            대답은 요약해서 한 문장으로 끝내줘.
                            대답은 너의 성격과 MBTI에 맞게 말투를 바꿔서 대답 해 줘야 해.
                            대답은 지역에 따라 사투리를 사용할 수도 있어야 해.
                            사용자의 현재 날짜에 대한 정보도 같이 줄건데 필요한 경우가 아니면 사용자한테 안알려줘도 돼.
                            json으로 준다고 해서 응답을 json으로 주지마.
                            chatContent는 사용자가 너에게 묻는 거고 timestamp는 사용자의 시간이야.

                            여기까지야.
                            """
    )
    sendedAt = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    chatContent = "너에 대한 사용자가 수정한 정보야. \n"
    chatContent += '' if request.name is None or request.name == '' else '너의 이름은 앞으로 ' + request.name + ' 야. \n'
    chatContent += '' if request.job is None or request.job == '' else '너의 직업은 앞으로 ' + request.job + ' 야 \n'
    chatContent += '' if request.residence is None or request.residence == '' else '너가 사는 곳은 앞으로 ' + request.residence + ' 야 \n'

    chatContent += '' if request.instruction is None or request.instruction == '' else '너의 설문 정보는 아래와 같이 수정되었어. 기존 내용에 이부분을 수정해줘.' + request.instruction
    send_message_to_assistant(chatContent=chatContent, timestamp=sendedAt, assistant_id=request.assistant_id, thread_id=request.thread_id)
    return JSONResponse(content=None, status_code=200)

def send_message_to_assistant(chatContent: str, timestamp: str, assistant_id: str, thread_id: str):
    message_handler = MessageHandler(assistant_id, thread_id)

    request = {chatContent: chatContent, timestamp: timestamp}

    content = message_handler.get_response(json.dumps(request))

    return content