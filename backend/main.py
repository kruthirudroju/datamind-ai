import os
from fastapi import FastAPI, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io

# 1. IMPORT AND RUN LOAD_DOTENV FIRST
from dotenv import load_dotenv
load_dotenv()  # This loads the variables from your .env file into your system memory

# 2. NOW IMPORT AND INITIALIZE OPENAI
from openai import OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# 3. INITIALIZE FASTAPI
app = FastAPI(title="DataMind AI Backend", version="1.0")
...