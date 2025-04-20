from fastapi import FastAPI
from routes.agents import router as agents_router

app = FastAPI()

app.include_router(agents_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
