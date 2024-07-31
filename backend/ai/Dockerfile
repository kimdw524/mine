FROM python:3.12-alpine

WORKDIR /ai

COPY . .
RUN pip install --upgrade pip
RUN pip install fastapi openai pika pymysql
#
EXPOSE 8000

ENTRYPOINT ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
