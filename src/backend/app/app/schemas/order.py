from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# Shared properties
class OrderBase(BaseModel):
    amount: float
    shipping_address: dict
    payment: str
    status: int


# Properties to receive via API on creation
class OrderCreate(OrderBase):
    pass


# Properties to receive via API on update
class OrderUpdate(OrderBase):
    name: Optional[str] = None
    amount: Optional[float] = None
    shipping_address: Optional[dict] = None
    payment: Optional[str] = None
    status: Optional[int] = None
    # products: Optional["Product"] = None


class OrderInDBBase(OrderBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Order(OrderInDBBase):
    # products: List["Product"]
    pass


# Additional properties stored in DB
class OrderInDB(OrderInDBBase):
    pass
