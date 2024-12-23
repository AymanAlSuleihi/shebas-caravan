from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
# from app.models.order import Order
from app.models.shipping_zone import ShippingZone


class ShippingCountryBase(SQLModel):
    name: str


class ShippingCountryCreate(ShippingCountryBase):
    pass


class ShippingCountryUpdate(SQLModel):
    name: Optional[str]


class ShippingCountry(
    TimeStampModel,
    ShippingCountryBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    zone_id: Optional[int] = Field(default=None, foreign_key="zone.id")
    zone: Optional["ShippingZone"] = Relationship(back_populates="countries")


class ShippingCountryOut(ShippingCountryBase):
    id: int


class ShippingCountryOutOpen(SQLModel):
    id: int


class ShippingCountriesOut(SQLModel):
    shipping_countries: List[ShippingCountryOut]
    count: int