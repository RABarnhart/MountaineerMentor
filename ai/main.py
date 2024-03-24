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
    message = request.get_json()
    print("received data...")
    messages.append({'role':'user', 'message':message})
    print(messages)
    return jsonify(message)

@app.route('/messages', methods = ['GET'])
def get_message_data():
    print('Sending messages')
    return jsonify(messages)

@app.route('/debug', methods = ['GET'])
def pong():
    return 'Pong'

# Inputs a message string and returns the chat history
def chatbot_IO(message):
    load_dotenv()
    client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))

    # add each message to the list
    chat_log.append({"role": "user", "content": data.prompt + data.data + "question: " + message})

    # Request gpt-3.5-turbo for chat completion
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=chat_log
    )

    # Print the response and add it to the messages list
    chat_message = response.choices[0].message.content
    
    print(f"Bot: {chat_message}")
    chat_log.append({"role" : "assistant", "content": chat_message})
    
    return chat_log

if __name__ == "__main__":
    chatbot_IO(input("user: "))
    #app.run(host='localhost', port=8000)

