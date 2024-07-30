FROM python:3.12-alpine

WORKDIR /ai

COPY . .

RUN pip install fastapi openai pika pymysql
#
EXPOSE 8000

RUN ls -l

CMD ["uvicorn", "main:app"]