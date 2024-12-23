from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
from app.models.shipping_country import ShippingCountry
from app.models.shipping_rate import ShippingRate
# from app.models.order import Order
from app.models.shipping_zone import ShippingZone


class ShippingZoneBase(SQLModel):
    name: str


class ShippingZoneCreate(ShippingZoneBase):
    pass


class ShippingZoneUpdate(SQLModel):
    name: Optional[str]


class ShippingZone(
    TimeStampModel,
    ShippingZoneBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    countries: List[ShippingCountry] = Relationship(back_populates="zone")
    rates: List[ShippingRate] = Relationship(back_populates="zone")


class ShippingZoneOut(ShippingZoneBase):
    id: int


# class ShippingZoneOutOpen(SQLModel):
#     id: int


class ShippingZonesOut(SQLModel):
    shipping_zones: List[ShippingZoneOut]
    count: int