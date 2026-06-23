from fastapi import APIRouter, UploadFile, File
from app.services.resume_parser import extract_text_from_pdf
from app.services.gemini_service import analyze_resume

router = APIRouter()

@router.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    file_bytes = await file.read()
    text = extract_text_from_pdf(file_bytes)
    result = analyze_resume(text)
    return result