from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000'],
    allow_methods = ["*"],
    allow_headers = ["*"],
)

app.include_router(resume.router,prefix='/resume')

@app.get("/")
def root():
    return {'message' : 'AI Career Copilo Backend Running'}
