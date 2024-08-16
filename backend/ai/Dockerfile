FROM python:3.12-alpine

WORKDIR /ai

COPY . .
RUN pip install --upgrade pip
RUN pip install uvicorn fastapi openai pika pymysql python-dotenv
#
EXPOSE 8000

ENTRYPOINT ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
