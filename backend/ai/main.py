import json
from contextlib import asynccontextmanager
from datetime import datetime

import pika
from fastapi import FastAPI
import time


from api.assistant_router import router as assistant_router
from assistant.message_handler import MessageHandler

RABBITMQ_HOST = 'rabbitmq'
CHAT_QUEUE_NAME = 'chat-queue-fastapi'
CHAT_SPRING_QUEUE_NAME = 'chat-queue-springboot'


def get_connection():
    credentials = pika.PlainCredentials(username="guest", password="guest")
    while True:
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(host=RABBITMQ_HOST, port=5672, credentials=credentials)
            )
            print("Connected to RabbitMQ")
            return connection
        except pika.exceptions.AMQPConnectionError:
            print("Connection failed, retrying in 5 seconds...")
            time.sleep(5)


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

    print(jsonData)
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

    print(responseMessage)

    connection = get_connection()
    channel = connection.channel()

    # 다시 spring websocket 서버에 전송
    channel.basic_publish(
        exchange='amq.direct',
        routing_key='spring-chat-server',
        body=json.dumps(responseMessage)
    )

    connection.close()


def start_consumer():
    connection = get_connection()
    channel = connection.channel()

    # 소비자 설정
    channel.basic_consume(
        queue=CHAT_QUEUE_NAME,
        on_message_callback=callback,
        auto_ack=True,
    )

    print("Waiting for messages. To exit press CTRL+C")
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
