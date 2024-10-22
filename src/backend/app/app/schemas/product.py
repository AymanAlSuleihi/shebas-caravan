from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel

from app.schemas.category import Category


# Shared properties
class ProductBase(BaseModel):
    name: str
    type: str
    sku: str
    cost: float
    price: float
    quantity: int
    images: List[str] = []
    short_description: str
    description: str
    material: str
    weight: float
    size: str

    category_ids: List[int]


# Properties to receive via API on creation
class ProductCreate(ProductBase):
    pass


# Properties to receive via API on update
class ProductUpdate(ProductBase):
    name: Optional[str] = None
    sku: Optional[str] = None
    type: Optional[str] = None
    cost: Optional[float] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    images: Optional[List[str]] = []
    short_description: Optional[str] = None
    description: Optional[str] = None
    material: Optional[str] = None
    weight: Optional[float] = None
    size: Optional[str] = None
    # categories: List[Category] = None


class ProductInDBBase(ProductBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Product(ProductInDBBase):
    # categories: Optional[List[Category]] = None
    pass

# Additional properties stored in DB
class ProductInDB(ProductInDBBase):
    pass
