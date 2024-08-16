import os.path

from openai import OpenAI, NOT_GIVEN
from dotenv import load_dotenv
import os


class Assistant:
    load_dotenv()
    client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

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

    def update_assistant(self, assistant_id, instruction, name):
        self.client.beta.assistants.update(
            name=name,
            instructions=instruction,
            assistant_id=assistant_id
        )