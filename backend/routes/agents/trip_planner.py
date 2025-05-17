from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from datetime import datetime
from transformers import pipeline

# Load Hugging Face model once at startup
generator = pipeline("text2text-generation", model="t5-small", tokenizer="t5-small")

router = APIRouter(
    prefix="/agents/trip-planner",
    tags=["Trip Planner Agent"]
)

class TripRequest(BaseModel):
    destination: str
    start_date: str
    end_date: str
    interests: List[str]
    travel_style: str
    preferred_activities: List[str]
    daily_budget: int = None

@router.post("/generate-itinerary/")
def generate_itinerary(request: TripRequest):
    days = (datetime.fromisoformat(request.end_date) - datetime.fromisoformat(request.start_date)).days + 1
    prompt = (
        f"Create a {days}-day travel itinerary to {request.destination} for someone interested in "
        f"{', '.join(request.interests)} and prefers {request.travel_style} travel. "
        f"They want to do activities like {', '.join(request.preferred_activities)}. "
    )
    if request.daily_budget:
        prompt += f"The daily budget is ${request.daily_budget}. "

    prompt += "Give a day-by-day breakdown."

    response = generator(prompt, max_length=512, do_sample=True, temperature=0.8)[0]['generated_text']
    return {"itinerary": response}


@router.get("/")
def get_trip_planner():
    return {"message": "Trip Planner Agent is running"}