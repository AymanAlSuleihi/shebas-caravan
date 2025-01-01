from typing import Dict, List, Optional, Union
from uuid import UUID

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
from app.models.customer import Customer
from app.models.generic import ProductCartLink
from app.models.shipping_rate import ShippingRate
# from app.models.product import Product, ProductOutOpen
from app.models.product import ProductOutOpen # TODO: Comment/uncomment before/after alembic migrations


class CartBase(SQLModel):
    unique_id: UUID
    amount: Optional[float] = None
    shipping_address: dict = Field(sa_column=Column(JSONB), default={})
    shipping_rate_data: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    payment: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    payment_breakdown: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    status: int


class CartCreate(CartBase):
    pass


class CartUpdate(SQLModel):
    unique_id: Optional[UUID] = None
    amount: Optional[float] = None
    shipping_address: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    shipping_rate_data: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    payment: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    payment_breakdown: Optional[dict] = Field(sa_column=Column(JSONB), default={})
    status: Optional[int] = None


class Cart(
    TimeStampModel,
    CartBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    customer_id: Optional[int] = Field(default=None, foreign_key="customer.id")
    customer: Optional[Customer] = Relationship(back_populates="carts")

    # products: List["Product"] = Relationship(back_populates="carts", link_model=ProductCartLink)
    shipping_rate_id: Optional[int] = Field(default=None, foreign_key="shippingrate.id")
    shipping_rate: Optional[ShippingRate] = Relationship(back_populates="carts")

    product_links: List[ProductCartLink] = Relationship(back_populates="cart")
    products: List["Product"] = Relationship(
        back_populates="carts",
        link_model=ProductCartLink,
        sa_relationship_kwargs={"viewonly": True},
    )


class CartOut(CartBase):
    id: int
    product_links: List[ProductCartLink] = []
    products: list = None


class CartOutOpen(CartBase):
    id: int
    product_links: List[ProductCartLink] = []
    products: List["ProductOutOpen"] = None # TODO: Comment/uncomment before/after alembic migrations
