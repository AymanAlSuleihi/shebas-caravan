from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel
# from app.models.order import Order


class ShipmentBase(SQLModel):
    dispatched_at: datetime
    method: str
    tracking_number: str
    tracking_link: str


class ShipmentCreate(ShipmentBase):
    pass


class ShipmentUpdate(SQLModel):
    dispatched_at: Optional[datetime]
    method: Optional[str]
    tracking_number: Optional[str]
    tracking_link: Optional[str]


class Shipment(
    TimeStampModel,
    ShipmentBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    order_id: Optional[int] = Field(default=None, foreign_key="order.id")
    order: Optional["Order"] = Relationship(back_populates="shipments")


class ShipmentOut(ShipmentBase):
    id: int


class ShipmentOutOpen(SQLModel):
    id: int
