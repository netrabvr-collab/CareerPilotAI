import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash')

def analyze_skill_gap(resume_text:str,jd_text:str)->dict:
    prompt = f"""
    Compare this resume against the job description and respond in this exact format:

    MATCH_SCORE: (number out of 100)

    MATCHED_SKILLS:
    - (skill 1)
    - (skill 2)
    - (skill 3)

    MISSING_SKILLS:
    - (skill 1)
    - (skill 2)
    - (skill 3)

    RECOMMENDATIONS:
    - (recommendation 1)
    - (recommendation 2)
    - (recommendation 3)

    VERDICT:
    (2 line summary of fit for this role)

    Resume:
    {resume_text}

    Job Description:
    {jd_text}
    """
    response = model.generate_content(prompt)
    raw = response.text

    def parse_response(raw):
        lines = raw.split("\n")
        result = {
            "match_score": "",
            "matched_skills": [],
            "missing_skills": [],
            "recommendations": [],
            "verdict": ""
        }
        current = None
        for line in lines:
            line = line.strip()
            if line.startswith("MATCH_SCORE:"):
                result["match_score"] = line.replace("MATCH_SCORE:", "").strip()
            elif line.startswith("MATCHED_SKILLS:"):
                current = "matched_skills"
            elif line.startswith("MISSING_SKILLS:"):
                current = "missing_skills"
            elif line.startswith("RECOMMENDATIONS:"):
                current = "recommendations"
            elif line.startswith("VERDICT:"):
                current = "verdict"
            elif line.startswith("- ") and current in ["matched_skills", "missing_skills", "recommendations"]:
                result[current].append(line[2:])
            elif current == "verdict" and line:
                result["verdict"] += line + " "
        return result

    return parse_response(raw)    