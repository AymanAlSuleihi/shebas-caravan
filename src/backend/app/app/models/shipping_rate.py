from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
from app.models.shipping_country import ShippingCountry
from app.models.shipping_zone import ShippingZone
# from app.models.order import Order


class ShippingRateBase(SQLModel):
    weight_max: float
    package_size_name: str
    package_size_dimensions: List[float]
    insurance: float
    price: float


class ShippingRateCreate(ShippingRateBase):
    pass


class ShippingRateUpdate(SQLModel):
    weight_max: Optional[float]
    package_size_name: Optional[str]
    package_size_dimensions: Optional[list]
    insurance: Optional[float]
    price: Optional[float]


class ShippingRate(
    TimeStampModel,
    ShippingRateBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    zone_id: Optional[int] = Field(default=None, foreign_key="zone.id")
    zone: Optional["ShippingZone"] = Relationship(back_populates="rates")


class ShippingRateOut(ShippingRateBase):
    id: int


class ShippingRateOutOpen(SQLModel):
    id: int
