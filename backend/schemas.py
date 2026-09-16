from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    mobile_number: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: str
    center_name: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class ReceiptCreate(BaseModel):
    center_name: Optional[str] = None
    date: str
    shift: str
    purchase_time: Optional[str] = None
    producer_name: Optional[str] = None
    producer_number: Optional[int] = None
    fat: Optional[float] = None
    snf: Optional[float] = None
    quantity: Optional[float] = None
    water_percent: Optional[float] = None
    rate: Optional[float] = None
    total_amount: Optional[float] = None
    user_id: str

class ReceiptResponse(ReceiptCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
