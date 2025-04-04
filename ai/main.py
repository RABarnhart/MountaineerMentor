import copy
from openai import OpenAI
from dotenv import load_dotenv
import data
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import json
import os

chat_log = []
internal_chat_log = []

load_dotenv()
client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))

# FLASK
app = Flask(__name__)
CORS(app)

print(app)

@app.route('/messages', methods=['POST'])
def send_message_to_ai():
    message = request.get_json()
    chatbot_IO(message)
    return "Recieved Request"

@app.route('/messages', methods = ['GET'])
def get_message_data():
    print(chat_log)
    return jsonify(chat_log)

# Inputs a message string and returns the chat history
def chatbot_IO(message):
    load_dotenv()
    client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))


    internal_chat_log = copy.copy(chat_log)

    # add each message to the list
    internal_chat_log.append({"role": "user", "content": data.prompt + data.data + "question: " + message})
    chat_log.append({"role": "user", "content": message})

    # Request gpt-3.5-turbo for chat completion
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=internal_chat_log
    )

    # Print the response and add it to the messages list
    chat_message = response.choices[0].message.content
    
    print(f"Bot: {chat_message}")
    chat_log.append({"role" : "assistant", "content": chat_message})
    
    internal_chat_log = []

if __name__ == "__main__":
    app.run(host='localhost', port=8000)

