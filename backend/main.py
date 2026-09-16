import os
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import google.generativeai as genai
import json
import time
from datetime import datetime, timedelta
import asyncio
from typing import List, Optional
from dotenv import load_dotenv
from pathlib import Path

# Reliably load .env from the project root
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env", override=True)
load_dotenv(override=True)

from . import models, schemas
from .database import engine, get_db

models.Base.metadata.create_all(bind=engine)

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI()

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(f"Validation Error: {exc}")
    print(f"Body: {await request.body()}")
    return JSONResponse(status_code=422, content={"detail": exc.errors()})

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup Gemini
# (Configuration will happen dynamically in the route to ensure fresh environment)

class LoginRequest(BaseModel):
    name: str
    mobile_number: str

@app.post("/api/auth/login", response_model=schemas.UserResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.mobile_number == req.mobile_number).first()
    if not user or user.name.strip().lower() != req.name.strip().lower():
        raise HTTPException(status_code=401, detail="Invalid name or mobile number")
    return user

@app.post("/api/auth/signup", response_model=schemas.UserResponse)
def signup(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.mobile_number == req.mobile_number).first()
    if user:
        raise HTTPException(status_code=400, detail="User with this mobile number already exists")
    
    new_user = models.User(name=req.name, mobile_number=req.mobile_number)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
@app.post("/api/receipts/extract")
async def extract_receipt(image: UploadFile = File(...)):
    current_api_key = os.getenv("GEMINI_API_KEY")
    print(f"DEBUG: GEMINI_API_KEY inside route is {current_api_key}")
    print(f"DEBUG: dotenv path was {BASE_DIR / '.env'}")
    if not current_api_key or current_api_key == "dummy":
        raise HTTPException(status_code=500, detail=f"Gemini API Key not configured. Key is {current_api_key}")

    contents = await image.read()
    
    # Configure Gemini request
    genai.configure(api_key=current_api_key)
    model = genai.GenerativeModel("gemini-3.6-flash", generation_config={"response_mime_type": "application/json"})
    
    prompt = """
    Extract the details from this milk receipt. Return ONLY a valid JSON object matching this schema exactly:
    {
        "center_name": "string or null",
        "date": "string (YYYY-MM-DD)",
        "shift": "string (AM or PM)",
        "purchase_time": "string (HH:MM:SS) or null",
        "producer_name": "string or null",
        "producer_number": "integer or null",
        "fat": "float or null",
        "snf": "float or null",
        "quantity": "float",
        "water_percent": "float or null",
        "rate": "float",
        "total_amount": "float"
    }
    """

    retries = 3
    delay = 1
    
    for attempt in range(retries):
        try:
            response = await asyncio.to_thread(
                model.generate_content,
                [
                    {"mime_type": image.content_type, "data": contents},
                    prompt
                ]
            )
            result = json.loads(response.text)
            return {"success": True, "data": result}
        except Exception as e:
            if attempt == retries - 1:
                raise HTTPException(status_code=500, detail=str(e))
            await asyncio.sleep(delay)
            delay *= 2

@app.post("/api/receipts/save", response_model=schemas.ReceiptResponse)
def save_receipt(receipt: schemas.ReceiptCreate, db: Session = Depends(get_db)):
    db_receipt = models.Receipt(**receipt.dict())
    db.add(db_receipt)
    
    # Update center name for user if it's the first time
    user = db.query(models.User).filter(models.User.id == receipt.user_id).first()
    if user and not user.center_name and receipt.center_name:
        user.center_name = receipt.center_name
        
    db.commit()
    db.refresh(db_receipt)
    return db_receipt

@app.get("/api/receipts/dashboard")
def get_dashboard(user_id: str, db: Session = Depends(get_db)):
    receipts = db.query(models.Receipt).filter(models.Receipt.user_id == user_id).order_by(models.Receipt.date.desc(), models.Receipt.shift.desc()).all()
    
    # Simple logic for cycles (H1: 1-15, H2: 16-31 of current month)
    now = datetime.now()
    current_year = now.year
    current_month = now.month
    
    total_payout = 0
    total_milk = 0
    total_rate_sum = 0
    total_rate_count = 0
    am_shifts = 0
    pm_shifts = 0
    total_fat_sum = 0
    total_fat_count = 0
    
    feed = []
    
    for r in receipts:
        # Assuming r.date is YYYY-MM-DD
        feed.append({
            "date": r.date,
            "shift": r.shift,
            "liters": r.quantity,
            "fat": r.fat,
            "snf": r.snf,
            "amount": r.total_amount
        })
        
        # Calculate stats for the current cycle logic
        # Here we just aggregate all for simplicity, but ideally filter by current cycle
        total_payout += r.total_amount
        total_milk += r.quantity
        if r.rate:
            total_rate_sum += r.rate
            total_rate_count += 1
        if r.fat:
            total_fat_sum += r.fat
            total_fat_count += 1
            
        if r.shift == 'AM':
            am_shifts += 1
        else:
            pm_shifts += 1
            
    stats = {
        "totalPayout": total_payout,
        "totalMilk": total_milk,
        "averageRate": (total_rate_sum / total_rate_count) if total_rate_count > 0 else 0,
        "amShifts": am_shifts,
        "pmShifts": pm_shifts,
        "avgFat": (total_fat_sum / total_fat_count) if total_fat_count > 0 else 0,
        "avgWater": 0.0
    }
    
    # Generate mock cycles for now based on data
    cycles = [
        { "id": 1, "name": "Current Cycle", "type": "15-Day Bill", "amount": total_payout, "status": "current", "milk": total_milk, "fat": stats["avgFat"], "rate": stats["averageRate"] }
    ]
    
    return {
        "stats": stats,
        "feed": feed,
        "cycles": cycles
    }
