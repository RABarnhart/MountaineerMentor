# pip install openai
from openai import OpenAI
from dotenv import load_dotenv
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

import os
import sys
import json

load_dotenv()
client = OpenAI(
   api_key=os.getenv('OPEN_AI_KEY')
)
messages = []

# FLASK
app = Flask(__name__)
CORS(app)

print(app)

@app.route('/messages', methods=['POST'])
def send_message_to_ai():
    data = request.get_json()
    print("received data...")
    messages.append(data)
    print(messages)
    return jsonify(data)

@app.route('/messages', methods = ['GET'])
def get_message_data():
    print('Sending messages')
    print(messages)
    return jsonify(messages)

@app.route('/debug', methods = ['GET'])
def pong():
    return 'Pong'

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
    app.run(host='localhost', port=8000)

