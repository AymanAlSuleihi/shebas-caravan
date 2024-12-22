from typing import List, Optional, Union

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

from app.core.models import TimeStampModel
from app.models.log import Log


class CustomerBase(SQLModel):
    email: EmailStr = Field(index=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(SQLModel):
    email: Optional[EmailStr] = Field(index=True)
    first_name: Optional[str] = None
    last_name: Optional[str] = None


class Customer(
    TimeStampModel,
    CustomerBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    carts: List["Cart"] = Relationship(back_populates="customer")
    orders: List["Order"] = Relationship(back_populates="customer")
    logs: List[Log] = Relationship(back_populates="customer")


class CustomerOut(CustomerBase):
    id: int
    carts: list = None
    orders: list = None
    logs: list = None


class CustomersOut(SQLModel):
    customers: List[CustomerOut]
    count: int
