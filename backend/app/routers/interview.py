from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from app.services.interview_service import generate_questions, evaluate_answer
from app.services.resume_parser import extract_text_from_pdf

router = APIRouter()

@router.post('/generate-questions')
async def get_questions(
    resume: UploadFile = File(...),
    role: str = Form(...)
):
    resume_bytes = await resume.read()
    resume_text = extract_text_from_pdf(resume_bytes)
    result = generate_questions(resume_text,role)
    return result

class AnswerInput(BaseModel):
    question:str
    answer:str

@router.post('/evaluate-answer')
async def get_feedback(data:AnswerInput):
    result = evaluate_answer(data.question,data.answer)
    return result
