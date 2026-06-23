import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-flash-latest")

def analyze_resume(resume_text: str) -> dict:
    prompt = f"""
    Analyze this resume and respond in this exact format:

    ATS_SCORE: (number out of 100)
    
    STRENGTHS:
    - (strength 1)
    - (strength 2)
    - (strength 3)
    
    WEAKNESSES:
    - (weakness 1)
    - (weakness 2)
    - (weakness 3)
    
    MISSING_KEYWORDS:
    - (keyword 1)
    - (keyword 2)
    - (keyword 3)
    - (keyword 4)
    - (keyword 5)
    
    SUMMARY:
    (2 line overall summary)

    Resume:
    {resume_text}
    """
    response = model.generate_content(prompt)
    return {"raw": response.text}