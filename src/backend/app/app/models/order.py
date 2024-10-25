from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
from app.models.customer import Customer
from app.models.shipment import Shipment
from app.models.generic import ProductOrderLink


class OrderBase(SQLModel):
    amount: float
    ordered_product_data: List[Dict[str, Union[str, int, float, list]]] = Field(sa_column=Column(JSONB), default=[])
    shipping_address: dict = Field(sa_column=Column(JSONB), default={})
    payment: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    status: int


class OrderCreate(OrderBase):
    pass


class OrderUpdate(SQLModel):
    amount: Optional[float] = None
    ordered_product_data: List[Dict[str, Union[str, int, float]]] = Field(sa_column=Column(JSONB), default=[])
    shipping_address: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    payment: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    status: Optional[int] = None


class Order(
    TimeStampModel,
    OrderBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    customer_id: Optional[int] = Field(default=None, foreign_key="customer.id")
    customer: Optional[Customer] = Relationship(back_populates="orders")

    product_links: List[ProductOrderLink] = Relationship(back_populates="order")
    products: List["Product"] = Relationship(
        back_populates="orders",
        link_model=ProductOrderLink,
        sa_relationship_kwargs={"viewonly": True},
    )

    shipments: List[Shipment] = Relationship(back_populates="order")


class OrderOut(OrderBase):
    id: int
    product_links: list = None
    products: list = None
    created_at: datetime = None
    updated_at: datetime = None
    customer: Customer = None
    shipments: list = None


class OrderOutOpen(SQLModel):
    id: int
    amount: Optional[float] = None
    ordered_product_data: list = None


class OrdersOut(SQLModel):
    orders: List[OrderOut]
    count: int
