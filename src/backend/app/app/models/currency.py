from datetime import datetime
from typing import Dict, List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String
from sqlalchemy.dialects.postgresql import JSONB

from app.core.models import TimeStampModel


class CurrencyBase(SQLModel):
    base_code: str
    target_code: str
    timestamp: datetime
    rate: float


class CurrencyCreate(CurrencyBase):
    pass


class CurrencyUpdate(SQLModel):
    base_code: Optional[str] = None
    target_code: Optional[str] = None
    timestamp: Optional[datetime] = None
    rate: Optional[float] = None


class Currency(
    TimeStampModel,
    CurrencyBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)


class CurrencyOut(CurrencyBase):
    id: int


class CurrencyOutOpen(SQLModel):
    id: int


class CurrenciesOut(SQLModel):
    currencies: List[CurrencyOut]
    count: int
