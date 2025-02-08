from flask import Flask, render_template, request, jsonify, send_from_directory
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import os
import requests
from google import genai

from dotenv import load_dotenv, dotenv_values
load_dotenv()

search_engine_id = "e5f41120b845448d0" #GSPE engine id code
# input = "How much formula should I feed my six-month old baby?"
app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory(os.path.join(os.path.dirname(__file__), '../public'), 'index.html')

@app.route('/get', methods=['POST'])
def chat():
    #msg = request.form['msg']
    msg = request.get_json()
    input = msg
    #url for search engine
    url = f"https://www.googleapis.com/customsearch/v1?q={input}&key={os.getenv('GSPE_ApiKey')}&cx={search_engine_id}"
    search_engine_response = requests.get(url) #gets the website data from search engine
    data = search_engine_response.json() #stores the website data
    response = get_Chat_Response(input, data)
    return jsonify({'response': response})

def get_Chat_Response(input, data):

    sources = titles = [item["title"]+"\n" for item in data.get("items", [])]
    sources_string = " ".join(sources)
    print("Sources string\n")
    print(sources_string)
    #from google import genai
    from googleapiclient.discovery import build
    gemini_prompt = f"""
    Answer the user's question first based off the resources listed below, 
    and then using all sites, give another response, clarifying that the information 
    in the second response is from outside resources:

    {sources_string}

    User Question: {input}

    If the user's question does not have any association with medical help, return a basic answer.
    """

    client = genai.Client(api_key=os.getenv("GEMINIAI_API_KEY"))
    #client = build("gemini", "v1", developerKey=os.getenv("GEMINIAI_API_KEY"))

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=gemini_prompt,
    )

    if response and response.text:
        return response.text
    return "Sorry, I couldn't generate a response."

@app.route('/src/<path:path>')
def serve_src(path):
    return send_from_directory(os.path.join(os.path.dirname(__file__), '../src'), path)

if __name__ == "__main__":
    app.run(debug=True)
