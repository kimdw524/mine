import json
from contextlib import asynccontextmanager
from datetime import datetime

import pika
from fastapi import FastAPI
import time

import logging

class CustomFormatter(logging.Formatter):
    def format(self, record):
        level = record.levelname
        message = record.getMessage()
        return f"{level} : {message}"

log1 = logging.getLogger("uvicorn.access")

log1.handlers = []

handler = logging.StreamHandler()
handler.setFormatter(CustomFormatter())

log1.addHandler(handler)

log1.setLevel(logging.INFO)


from api.assistant_router import router as assistant_router
from assistant.message_handler import MessageHandler

RABBITMQ_HOST = 'rabbitmq'
CHAT_QUEUE_NAME = 'chat-queue-fastapi'
CHAT_SPRING_QUEUE_NAME = 'chat-queue-springboot'

# 전역 변수로 선언
connection = None
channel = None

def get_connection_and_channel():
    global connection, channel

    if connection is None or connection.is_closed:
        credentials = pika.PlainCredentials(username="guest", password="guest")
        while True:
            try:
                connection = pika.BlockingConnection(
                    pika.ConnectionParameters(host=RABBITMQ_HOST, port=5672, credentials=credentials)
                )
                channel = connection.channel()
                log1.info("Connected to RabbitMQ")
                break
            except pika.exceptions.AMQPConnectionError:
                log1.error("Connection failed, retrying in 5 seconds...")
                time.sleep(5)

    return connection, channel


def send_message_to_assistant(chatContent: str, assistant_id: str, thread_id: str):
    message_handler = MessageHandler(assistant_id, thread_id)
    content = message_handler.get_response(chatContent)

    return content


# 받는 데이터 핸들러
def callback(ch, method, properties, body):
    # 아래 5가지는 데이터 담겨 오는 것.
    # chatContent
    # assistantId
    # threadId
    # avatarId
    # userId
    body = body.decode('utf-8')
    jsonData = json.loads(body)

    log1.info(jsonData)
    responseChat = send_message_to_assistant(jsonData['chatContent'], assistant_id=jsonData['assistantId'],
                                             thread_id=jsonData['threadId'])

    # 응답을 줄 때는 assistant에게 chat 내용을 보내서 응답을 가져올 것.
    # chatContent
    # sendedAt
    # avatarId
    # userId 를 돌려줄 것.
    sendedAt = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    responseMessage = {"chatContent": responseChat, "avatarId": jsonData['avatarId'], "userId": jsonData['userId'],
                       "sendedAt": sendedAt}

    log1.info(responseMessage)

    _, channel = get_connection_and_channel()

    # 다시 spring websocket 서버에 전송
    channel.basic_publish(
        exchange='amq.direct',
        routing_key='spring-chat-server',
        body=json.dumps(responseMessage)
    )




def start_consumer():
    _, channel = get_connection_and_channel()

    # 소비자 설정
    channel.basic_consume(
        queue=CHAT_QUEUE_NAME,
        on_message_callback=callback,
        auto_ack=True,
    )

    log1.info("Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()


@asynccontextmanager
async def lifespan(app: FastAPI):
    import threading
    consumer_thread = threading.Thread(target=start_consumer)
    consumer_thread.daemon = True
    consumer_thread.start()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(assistant_router)



from fastapi.responses import JSONResponse

@app.exception_handler(Exception)
async def invalid_user_id_exception_handler(exc):
    return JSONResponse(
        status_code=400,
        content={
            "content": str(exc),
        }
    )
