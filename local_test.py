import requests

# Direct request to your local FastAPI server
url = "http://127.0.0.1:8000/api/review"

payload = {
    "filename": "auth_test.py",
    "code": """
def check_user(username, password):
    # Intentional flaw: Hardcoded credentials
    if username == 'admin' and password == 'Secret123':
        return True
        
    # Intentional bug: Infinite loop
    while True:
        print('Validating parameters...')
        
    return False
"""
}

print("[Test] Sending code directly to local FastAPI server...")
try:
    response = requests.post(url, json=payload)
    print("Status Code:", response.status_code)
    print("\n[AI Review Output]:\n", response.json().get("review"))
except Exception as e:
    print("Error connecting to server. Make sure Uvicorn is running:", e)