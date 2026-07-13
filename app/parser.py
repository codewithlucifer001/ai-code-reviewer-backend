import ast

def analyze_code_structure(file_content: str) -> dict:
    """
    Parses a string of Python code into an Abstract Syntax Tree (AST) 
    and extracts metadata such as functions, classes, and loops to give context to the AI.
    """
    try:
        tree = ast.parse(file_content)
    except SyntaxError as e:
        return {"error": f"Invalid syntax discovered during parsing: {e}"}

    metadata = {
        "functions": [],
        "classes": [],
        "loops_found": False
    }

    # Walk through every single structural component (node) of the code
    for node in ast.walk(tree):
        # 1. Identify functions and their arguments
        if isinstance(node, ast.FunctionDef):
            metadata["functions"].append({
                "name": node.name,
                "args": [arg.arg for arg in node.args.args],
                "line_number": node.lineno
            })
            
        # 2. Identify classes
        elif isinstance(node, ast.ClassDef):
            metadata["classes"].append({
                "name": node.name, 
                "line_number": node.lineno
            })
            
        # 3. Identify loops (For or While) to watch for performance flaws later
        elif isinstance(node, (ast.For, ast.While)):
            metadata["loops_found"] = True

    return metadata