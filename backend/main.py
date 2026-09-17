from fastapi import FastAPI
from pydantic import BaseModel

from backend.ai_model import ask_ai

app = FastAPI(title="Multimodal AI Agent")


class Question(BaseModel):
    prompt: str


@app.get("/")
def home():
    return {
        "message": "Multimodal AI Agent is running!"
    }


@app.post("/ask")
def ask_question(question: Question):
    answer = ask_ai(question.prompt)

    return {
        "answer": answer
    }