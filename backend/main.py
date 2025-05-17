from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.agents import trip_planner  

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(trip_planner.router)

# Add other routers here as you build more agents

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
