# ⚡ Code Flow — AST Compiler Static Security Suite

Code Flow is a high-performance, full-stack static analysis platform designed to detect credential leaks, unhandled logic flaws, and security vulnerabilities in real time before code reaches pull request review.


## 🌐 Live Demo
- **URL:** https://codeflow-frontend-red.vercel.app/

## ✨ Key Features
- **Real-Time AST Analysis:** Parses codebase structures into Abstract Syntax Trees without code execution.
- **Clerk Auth & Protected Routes:** Secured workspace access (`/app`) with session-authenticated JWT tokens.
- **Recent Scan History:** Persists analysis reports, severity rankings, and timestamps across user accounts.
- **Embedded Monaco Editor:** Production-grade web IDE supporting real-time syntax buffering and multi-file staging.
- **System Telemetry & Topologies:** Live execution logging, telemetry inspection graphs, and output terminal streams.

## 🛠️ Tech Stack & Architecture
- **Frontend:** React, Vite, Tailwind CSS v4, Framer Motion, `@monaco-editor/react`
- **Backend:** Python, FastAPI, Uvicorn, Python AST Engine
- **Auth & Security:** Clerk Auth (`@clerk/clerk-react`), Bearer JWT Authorization
- **Deployment:** Vercel (Serverless Edge Deployment)

## 🚀 Local Development Setup

```bash
# Clone the repository
git clone [https://github.com/codewithlucifer001/ai-code-reviewer-backend.git](https://github.com/codewithlucifer001/ai-code-reviewer-backend.git)
cd ai-code-reviewer

# Backend Setup (Python FastAPI)
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev
