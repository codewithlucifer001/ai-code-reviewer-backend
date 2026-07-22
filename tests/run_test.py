import sys
import os

# Add the root directory to Python's lookup path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.parser import analyze_code_structure
from app.reviewer import generate_ai_review

def execute_local_test():
    mock_file_path = os.path.join(os.path.dirname(__file__), "mock_code.py")
    
    with open(mock_file_path, "r") as file:
        code_to_test = file.read()
        
    print("--- 1. Extracting Structural Metadata ---")
    ast_results = analyze_code_structure(code_to_test)
    
    print("--- 2. Submitting to Local AI Engine (This might take a moment...) ---")
    ai_feedback = generate_ai_review(code_to_test, ast_results)
    
    print("\n================== AI REVIEW OUTPUT ==================\n")
    print(ai_feedback)

if __name__ == "__main__":
    execute_local_test()