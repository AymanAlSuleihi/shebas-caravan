from typing import List, Optional, Union

from sqlmodel import Field, Relationship, SQLModel

from app.core.models import TimeStampModel
from app.models.generic import ProductCategoryLink
from app.models.product import Product, ProductOutOpen


class CategoryBase(SQLModel):
    name: str
    url_key: str
    thumbnail: str


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(SQLModel):
    name: Optional[str] = None
    url_key: Optional[str] = None
    thumbnail: Optional[str] = None


class Category(
    TimeStampModel,
    CategoryBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    products: List["Product"] = Relationship(back_populates="categories", link_model=ProductCategoryLink)


class CategoryOut(CategoryBase):
    id: int
    products: list = None


class CategoryOutOpen(CategoryBase):
    id: int
    products: List["ProductOutOpen"] = None


class CategoryOutWithProducts(CategoryOut):
    pass


class CategoriesOut(SQLModel):
    categories: List[Union[CategoryOut, CategoryOutOpen]] = None
    count: int
