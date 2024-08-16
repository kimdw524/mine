from assistant.message_handler import *
from dotenv import load_dotenv
import os
#

load_dotenv()
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
print(os.getenv('OPENAI_API_KEY'))
#
# # result = client.beta.threads.messages.list(thread_id="thread_fl7nsnIUoR0ZurPDzUtMIrAX", order="asc")
# #
# # print(result.data[1].content[0].text.value)
#
# assistant_id = "asst_gzUHR2Orr2KnitbLKcoaU9q3"
# thread_id = "thread_l57yNZOhonW5h2vOm8gkzhgw"
#
# message_handler = MessageHandler(assistant_id, thread_id)
#
# run = message_handler.wait_on_run(message_handler.submit_message("해석학 잘할려면 뭐해야해?"))
#
# print(run)
#
