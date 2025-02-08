
import os
from dotenv import load_dotenv, dotenv_values
# loading variables from .env file
load_dotenv()


from google import genai

client = genai.Client(api_key=os.getenv("GEMINIAI_API_KEY"))

response = client.models.generate_content(
    model="gemini-2.0-flash",
    contents="How many milliliters of baby formula does a 6 month old need?",
)

print(response.text)