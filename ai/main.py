# pip install openai

from openai import OpenAI
from dotenv import load_dotenv
import os
import sys

load_dotenv()
client = OpenAI(
   api_key=os.getenv('OPEN_AI_KEY')
)
messages = []

def bot():
    # Keep repeating the following
  while True:
    # Prompt user for input

    message = input("User: ")

    # Exit program if user inputs "quit"
    if message.lower() == "quit":
        break

    # add each message to the list
    messages.append({"role": "user", "content": message})

    # Request gpt-3.5-turbo for chat completion
    response = client.chat.completions.create(
       model="gpt-3.5-turbo",
       messages=messages
    )

    # Print the response and add it to the messages list
    chat_message = response.choices[0].message.content
    print(f"Bot: {chat_message}")
    messages.append({"role" : "assistant", "content": chat_message})

if __name__ == "__main__":
    print("Start chatting with the bot (type 'quit' to stop)!")
    bot()
