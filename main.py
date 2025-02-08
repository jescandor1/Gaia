
import os
import requests

from dotenv import load_dotenv, dotenv_values
load_dotenv()

search_engine_id = "e5f41120b845448d0" #GSPE engine id code
input = "How much formula should I feed my six-month old baby?"

url = f"https://www.googleapis.com/customsearch/v1?q={input}&key={os.getenv('GSPE_ApiKey')}&cx={search_engine_id}"

response = requests.get(url)
data = response.json()

sources = titles = [item["title"]+"\n" for item in data.get("items", [])]
sources_string = " ".join(sources)
print("Sources string\n")
print(sources_string)
from google import genai
gemini_prompt = f"""
Answer the user's question first based off the resources listed below, 
and then using all sites, give another response, clarifying that the information 
in the second response is from outside resources:

{sources_string}

User Question: {input}
"""

client = genai.Client(api_key=os.getenv("GEMINIAI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents=gemini_prompt,
)

print(response.text)


#this is the programmable search engine thing
    # <script async src="https://cse.google.com/cse.js?cx=e5f41120b845448d0">
    # </script>
    # <div class="gcse-search"></div>

