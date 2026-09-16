from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from .database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    created_at = Column(DateTime, default=datetime.utcnow)
    name = Column(String, nullable=False)
    mobile_number = Column(String, unique=True, index=True, nullable=False)
    center_name = Column(String, nullable=True)

    receipts = relationship("Receipt", back_populates="user")

class Receipt(Base):
    __tablename__ = "receipts"

    id = Column(String, primary_key=True, default=generate_uuid)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(String, ForeignKey("users.id"))
    
    center_name = Column(String, nullable=True)
    date = Column(String, nullable=False) # Storing as string YYYY-MM-DD for simplicity
    shift = Column(String, nullable=False) # 'AM' or 'PM'
    purchase_time = Column(String, nullable=True)
    producer_name = Column(String, nullable=True)
    producer_number = Column(Integer, nullable=True)
    fat = Column(Float, nullable=True)
    snf = Column(Float, nullable=True)
    quantity = Column(Float, nullable=True)
    water_percent = Column(Float, nullable=True)
    rate = Column(Float, nullable=True)
    total_amount = Column(Float, nullable=True)

    user = relationship("User", back_populates="receipts")
