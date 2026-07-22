import uvicorn

if __name__ == "__main__":
    # This points SnapDeploy's default runner directly to your actual FastAPI application structure
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000)