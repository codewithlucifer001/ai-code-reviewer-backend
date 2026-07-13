import os
import json
import requests

def generate_ai_review(code_content: str, ast_metadata: dict) -> str:
    """
    Sends the raw code alongside its parsed structural AST metadata to a fast 
    cloud developer API endpoint for a precise, senior-level code analysis.
    """
    # Pull the API key from the cloud environment variables safely
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return "Error: The 'GROQ_API_KEY' environment variable is not set on the server."

    # Using standard cloud provider completion endpoints
    url = "https://api.groq.com/openai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    system_instruction = (
        "You are an elite Senior Staff Engineer reviewing a code submission.\n"
        "Your task is to identify critical bugs, security vulnerabilities, and major performance issues.\n"
        "Ignore superficial style formatting unless it breaks code execution.\n"
        "Provide your feedback in clean Markdown format with a brief 'Summary', a list of 'Critical Issues', and 'Recommended Fixes'."
    )
    
    user_prompt = (
        f"Structural Code Context (AST Metadata):\n{json.dumps(ast_metadata, indent=2)}\n\n"
        f"Source Code to Review:\n\"\"\"\n{code_content}\n\"\"\""
    )
    
    # Payload adjusted to standard Chat Completion structures
    payload = {
        "model": "llama3-8b-8192",  # Replace with your preferred cloud model string
        "messages": [
            {"role": "system", "content": system_instruction},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.2,
        "stream": False
    }
    
    try:
        # Cloud APIs are incredibly fast, but we add a 30s timeout safety net
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        
        if response.status_code == 200:
            choices = response.json().get("choices", [])
            if choices:
                return choices[0].get("message", {}).get("content", "Error: Empty message content returned.")
            return "Error: No response options generated from the model."
        else:
            return f"Cloud LLM API Server Error: Status Code {response.status_code} - {response.text}"
            
    except requests.exceptions.Timeout:
        return "Error: The cloud AI core engine took too long to respond. Please try again."
    except requests.exceptions.ConnectionError:
        return "Error: Could not connect to the cloud LLM server. Verify your internet connection and endpoint configurations."