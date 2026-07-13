from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from app.parser import analyze_code_structure
from app.reviewer import generate_ai_review
import requests

app = FastAPI(
    title="AI Automated Code Reviewer Framework",
    description="A local AST-driven code analysis backend powered by FastAPI and Ollama.",
    version="1.0.0"
)

class CodeSubmission(BaseModel):
    filename: str
    code: str

@app.get("/")
def read_root():
    return {"status": "online", "engine": "FastAPI + Local Ollama Engine"}

@app.post("/api/review")
async def review_code(submission: CodeSubmission):
    if not submission.code.strip():
        raise HTTPException(status_code=400, detail="Source code content cannot be empty.")
    ast_metadata = analyze_code_structure(submission.code)
    if "error" in ast_metadata:
         raise HTTPException(status_code=422, detail=ast_metadata["error"])
    review_output = generate_ai_review(submission.code, ast_metadata)
    return {"filename": submission.filename, "review": review_output}

@app.post("/api/webhook/github")
async def github_webhook(request: Request):
    payload = await request.json()
    
    # Clean handling for GitHub's initial ping verification event
    if "zen" in payload:
        print("\n[GitHub Webhook] Ping received successfully! Secure tunnel connection verified.")
        return {"message": "Webhook active!", "zen": payload["zen"]}
    
    # Enforce checking for Pull Request schema data
    if "pull_request" not in payload:
        return {"message": "Event ignored. Not a Pull Request event."}
        
    action = payload.get("action")
    # Only target newly created PRs or pushed commit updates
    if action not in ["opened", "synchronize"]:
        return {"message": f"Action '{action}' ignored."}
        
    pr_data = payload["pull_request"]
    diff_url = pr_data.get("diff_url")
    
    # Retrieve the raw changes from the repository
    diff_response = requests.get(diff_url)
    if diff_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Failed to fetch PR diff from GitHub.")
        
    raw_diff = diff_response.text
    
    # Pipeline execution: AST Extraction -> Local Large Language Model generation
    ast_metadata = analyze_code_structure(raw_diff)
    ai_review = generate_ai_review(raw_diff, ast_metadata)
    
    print(f"\n[GitHub Webhook] Reviewed PR #{payload['number']} - {pr_data['title']}")
    print(ai_review)
    
    return {
        "status": "reviewed",
        "pull_request": payload["number"],
        "summary": "AI Review generated successfully."
    }