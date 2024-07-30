import time

from openai import OpenAI


class MessageHandler:
    def __init__(self, assistant_id, thread_id):
        self.client = OpenAI(api_key="sk-None-UMlcbFFlLf7aBiYFMy7YT3BlbkFJbO5ol9peEGHBKmR9Kkue")
        self.assistant_id = assistant_id
        self.thread_id = thread_id

    def submit_message(self, user_message):
        self.client.beta.threads.messages.create(
            thread_id=self.thread_id,
            role="user",
            content=user_message,
        )

        run = self.client.beta.threads.runs.create(
            thread_id=self.thread_id,
            assistant_id=self.assistant_id,
        )
        return run

    def wait_on_run(self, run):
        while run.status in ["queued", "in_progress"]:
            run = self.client.beta.threads.runs.retrieve(
                thread_id=self.thread_id,
                run_id=run.id,
            )
            time.sleep(0.2)
        return run

    def get_response(self, user_message):
        run = self.submit_message(user_message)
        self.wait_on_run(run)

        message = self.client.beta.threads.messages.list(
            thread_id=self.thread_id,
            order="desc"
        ).data
        return message[0].content[0].text.value
