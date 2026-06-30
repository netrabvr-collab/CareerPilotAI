import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.5-flash")

def generate_questions(resume_text: str, role: str) -> dict:
    prompt = f"""
    Based on this resume and target role, generate 5 interview questions.
    Mix of: 2 technical, 2 behavioral, 1 role-specific.

    Respond in this exact format:

    Q1: (question)
    TYPE1: (Technical/Behavioral/Role-specific)

    Q2: (question)
    TYPE2: (Technical/Behavioral/Role-specific)

    Q3: (question)
    TYPE3: (Technical/Behavioral/Role-specific)

    Q4: (question)
    TYPE4: (Technical/Behavioral/Role-specific)

    Q5: (question)
    TYPE5: (Technical/Behavioral/Role-specific)

    Target Role: {role}

    Resume:
    {resume_text}
    """

    response = model.generate_content(prompt)
    raw = response.text

    def parse_questions(raw):
        lines = raw.split("\n")
        questions = []
        current_q = None
        for line in lines:
            line = line.strip()
            if line.startswith("Q") and ":" in line:
                if current_q:
                    questions.append(current_q)
                current_q = {"question": line.split(":", 1)[1].strip(), "type": ""}
            elif line.startswith("TYPE") and current_q:
                current_q["type"] = line.split(":", 1)[1].strip()
        if current_q:
            questions.append(current_q)
        return {"questions": questions}

    return parse_questions(raw)


def evaluate_answer(question: str, answer: str) -> dict:
    prompt = f"""
    Evaluate this interview answer and respond in this exact format:

    SCORE: (number out of 10)

    FEEDBACK:
    (2-3 lines of specific feedback)

    IMPROVED_ANSWER:
    (a brief example of a stronger answer)

    Question: {question}
    Answer: {answer}
    """

    response = model.generate_content(prompt)
    raw = response.text

    def parse_feedback(raw):
        lines = raw.split("\n")
        result = {"score": "", "feedback": "", "improved_answer": ""}
        current = None
        for line in lines:
            line = line.strip()
            if line.startswith("SCORE:"):
                result["score"] = line.replace("SCORE:", "").strip()
            elif line.startswith("FEEDBACK:"):
                current = "feedback"
            elif line.startswith("IMPROVED_ANSWER:"):
                current = "improved_answer"
            elif current and line:
                result[current] += line + " "
        return result

    return parse_feedback(raw)