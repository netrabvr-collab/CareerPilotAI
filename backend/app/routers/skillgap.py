from fastapi import APIRouter
from pydantic import BaseModel
from app.services.skillgap_service import analyze_skill_gap
from app.services.resume_parser import extract_text_from_pdf
from fastapi import UploadFile, File, Form

router = APIRouter()

@router.post('/analyze')
async def skill_gap(
    resume: UploadFile = File(...),
    jd_text: str = Form(...)
):
    resume_bytes = await resume.read()
    resume_text = extract_text_from_pdf(resume_bytes)
    result = analyze_skill_gap(resume_text, jd_text)
    return result
