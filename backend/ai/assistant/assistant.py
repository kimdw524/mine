from openai import OpenAI


class Assistant:
    client = OpenAI(api_key="sk-None-UMlcbFFlLf7aBiYFMy7YT3BlbkFJbO5ol9peEGHBKmR9Kkue")

    def __init__(self):
        return

    def create_assistant(self, name, instructions):
        return self.client.beta.assistants.create(
            name=name,
            instructions=instructions,
            model="gpt-4-turbo-preview",
        ).id

    def create_thread(self):
        return self.client.beta.threads.create().id
