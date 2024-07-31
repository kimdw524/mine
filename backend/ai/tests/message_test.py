from assistant.message_handler import *

#
client = OpenAI(api_key="sk-None-UMlcbFFlLf7aBiYFMy7YT3BlbkFJbO5ol9peEGHBKmR9Kkue")
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
