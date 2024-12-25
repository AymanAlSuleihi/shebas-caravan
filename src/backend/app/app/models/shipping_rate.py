from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Float, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
from app.models.shipping_country import ShippingCountry


class ShippingRateBase(SQLModel):
    weight_max: float
    package_size_name: str
    service_name: str
    package_size_dimensions: List[float] = Field(default=None, sa_column=Column(ARRAY(Float())))
    delivery_time: str
    insurance: float
    price: float
    cost: float


class ShippingRateCreate(ShippingRateBase):
    pass


class ShippingRateUpdate(SQLModel):
    weight_max: Optional[float]
    package_size_name: Optional[str]
    service_name: Optional[str]
    package_size_dimensions: Optional[List[float]] = Field(default=None, sa_column=Column(ARRAY(Float())))
    delivery_time: Optional[str]
    insurance: Optional[float]
    price: Optional[float]
    cost: Optional[float]


class ShippingRate(
    TimeStampModel,
    ShippingRateBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    zone_id: Optional[int] = Field(default=None, foreign_key="shippingzone.id")
    zone: Optional["ShippingZone"] = Relationship(back_populates="rates")

    orders: List["Order"] = Relationship(back_populates="shipping_rate")
    carts: List["Cart"] = Relationship(back_populates="shipping_rate")


class ShippingRateOut(ShippingRateBase):
    id: int


class ShippingRateOutOpen(SQLModel):
    id: int
    weight_max: float
    package_size_name: str
    service_name: str
    package_size_dimensions: List[float] = Field(default=None, sa_column=Column(ARRAY(Float())))
    delivery_time: str
    insurance: float
    price: float


class ShippingRatesOut(SQLModel):
    shipping_rates: List[ShippingRateOut]
    count: int
