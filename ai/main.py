# pip install openai

from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter, CharacterTextSplitter
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from openai import OpenAI
from dotenv import load_dotenv
import data
import os

chat_log = []

def chatbot_IO(message):
    load_dotenv()
    client = OpenAI(api_key=os.getenv('OPEN_AI_KEY'))

    chat_log.append({"role": "user", "content": data.prompt + data.data + "question: " + message})
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
    chatbot_IO(input("User: "))
  
