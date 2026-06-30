import os
import google.generativeai as genai
from dotenv import load_dotenv
from google.api_core.exceptions import ResourceExhausted

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize model
model = genai.GenerativeModel("gemini-2.5-flash")


def parse_response(raw: str) -> dict:
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
            result["ats_score"] = (
                line.replace("ATS_SCORE:", "").strip()
            )

        elif line.startswith("STRENGTHS:"):
            current = "strengths"

        elif line.startswith("WEAKNESSES:"):
            current = "weaknesses"

        elif line.startswith("MISSING_KEYWORDS:"):
            current = "missing_keywords"

        elif line.startswith("SUMMARY:"):
            current = "summary"

        elif (
            line.startswith("- ")
            and current in [
                "strengths",
                "weaknesses",
                "missing_keywords",
            ]
        ):
            result[current].append(line[2:])

        elif current == "summary" and line:
            result["summary"] += line + " "

    result["summary"] = result["summary"].strip()

    return result


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

    try:
        response = model.generate_content(prompt)

        if not hasattr(response, "text") or not response.text:
            return {
                "ats_score": "0",
                "strengths": [],
                "weaknesses": [],
                "missing_keywords": [],
                "summary": "Gemini returned an empty response."
            }

        return parse_response(response.text)

    except ResourceExhausted:
        return {
            "ats_score": "0",
            "strengths": [],
            "weaknesses": [],
            "missing_keywords": [],
            "summary": (
                "Gemini API quota exceeded. "
                "Please try again later or use a different API key."
            )
        }

    except Exception as e:
        print("Gemini Error:", e)

        return {
            "ats_score": "0",
            "strengths": [],
            "weaknesses": [],
            "missing_keywords": [],
            "summary": f"Error: {str(e)}"
        }