from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles


class Memo(BaseModel):
    id: str
    content: str


memos = []

app = FastAPI()


@app.post("/memos")
def create_memo(memo: Memo):
    memos.append(memo)
    return memos


@app.get("/memos")
def read_memo():
    return memos


app.mount("/", StaticFiles(directory="static", html=True), name="static")
