from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class CustomerBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str


# Properties to receive via API on creation
class CustomerCreate(CustomerBase):
    pass


# Properties to receive via API on update
class CustomerUpdate(CustomerBase):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class CustomerInDBBase(CustomerBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Customer(CustomerInDBBase):
    # products: List["Product"]
    pass


# Additional properties stored in DB
class CustomerInDB(CustomerInDBBase):
    pass
