from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import Column, Field, Relationship, SQLModel
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
# from app.models.customer import Customer
# from app.models.order import Order
# from app.models.product import Product
# from app.models.generic import ProductLogLink


class LogBase(SQLModel):
    message: Optional[str] = None
    level: Optional[str] = None


class LogCreate(LogBase):
    pass


class LogUpdate(SQLModel):
    message: Optional[str] = None
    level: Optional[str] = None


class Log(
    TimeStampModel,
    LogBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    customer_id: Optional[int] = Field(default=None, foreign_key="customer.id")
    customer: Optional["Customer"] = Relationship(back_populates="logs")

    order_id: Optional[int] = Field(default=None, foreign_key="order.id")
    order: Optional["Order"] = Relationship(back_populates="logs")

    product_id: Optional[int] = Field(default=None, foreign_key="product.id")
    product: Optional["Product"] = Relationship(back_populates="logs")


class LogOut(LogBase):
    id: int
    created_at: datetime = None
    updated_at: datetime = None


class LogOutOpen(SQLModel):
    id: int
    message: Optional[str] = None
    level: Optional[str] = None


class LogsOut(SQLModel):
    logs: List[LogOut]
    count: int
