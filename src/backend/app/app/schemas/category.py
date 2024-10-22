from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# Shared properties
class CategoryBase(BaseModel):
    name: str


# Properties to receive via API on creation
class CategoryCreate(CategoryBase):
    pass


# Properties to receive via API on update
class CategoryUpdate(CategoryBase):
    name: Optional[str] = None
    # products: Optional["Product"] = None


class CategoryInDBBase(CategoryBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class Category(CategoryInDBBase):
    # products: List["Product"]
    pass


# Additional properties stored in DB
class CategoryInDB(CategoryInDBBase):
    pass
