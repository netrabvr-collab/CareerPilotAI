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
    raw = response.text

    def parse_response(raw):
        lines = raw.split("\n")
        result = {
            "ats_score": "",
            "strengths": [],
            "weaknesses": [],
            "missing_keywords": [],
            "summary": ""
        }
        current = None
        for line in lines:
            line = line.strip()
            if line.startswith("ATS_SCORE:"):
                result["ats_score"] = line.replace("ATS_SCORE:", "").strip()
            elif line.startswith("STRENGTHS:"):
                current = "strengths"
            elif line.startswith("WEAKNESSES:"):
                current = "weaknesses"
            elif line.startswith("MISSING_KEYWORDS:"):
                current = "missing_keywords"
            elif line.startswith("SUMMARY:"):
                current = "summary"
            elif line.startswith("- ") and current in ["strengths", "weaknesses", "missing_keywords"]:
                result[current].append(line[2:])
            elif current == "summary" and line:
                result["summary"] += line + " "
        return result

    return parse_response(raw)

    

