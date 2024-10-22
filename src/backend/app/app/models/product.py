from typing import List, Optional, Union

from sqlmodel import ARRAY, Column, Field, Relationship, SQLModel, String

from app.core.models import TimeStampModel
# from app.models.cart import Cart # TODO: Uncomment/comment before/after alembic migrations
# from app.models.category import Category
from app.models.order import Order
from app.models.generic import ProductCartLink, ProductCategoryLink, ProductOrderLink


class ProductBase(SQLModel):
    name: str
    url_key: str
    type: str
    sku: str
    cost: float
    price: float
    quantity: int
    images: List[str] = Field(default=None, sa_column=Column(ARRAY(String())))
    short_description: str
    description: str
    material: str
    weight: float
    size: str

    # category_ids: Optional[list[int]] = Field(default=None, foreign_key="category.id")


class ProductCreate(ProductBase):
    # categories: List = []
    pass


class ProductUpdate(SQLModel):
    name: Optional[str] = None
    url_key: Optional[str] = None
    sku: Optional[str] = None
    type: Optional[str] = None
    cost: Optional[float] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    images: List[str] = Field(default=None, sa_column=Column(ARRAY(String())))
    short_description: Optional[str] = None
    description: Optional[str] = None
    material: Optional[str] = None
    weight: Optional[float] = None
    size: Optional[str] = None
    # categories: List[Category] = None


class Product(
    TimeStampModel,
    ProductBase,
    table=True
):
    id: Union[int, None] = Field(default=None, primary_key=True)

    ## Many to many
    # carts: List["Cart"] = Relationship(back_populates="products", link_model=ProductCartLink)
    categories: List["Category"] = Relationship(back_populates="products", link_model=ProductCategoryLink)
    # orders: List["Order"] = Relationship(back_populates="products", link_model=ProductOrderLink)

    cart_links: List[ProductCartLink] = Relationship(back_populates="product")
    carts: List["Cart"] = Relationship(
        back_populates="products",
        link_model=ProductCartLink,
        sa_relationship_kwargs={"viewonly": True},
    )
    order_links: List[ProductOrderLink] = Relationship(back_populates="product")
    orders: List["Order"] = Relationship(
        back_populates="products",
        link_model=ProductOrderLink,
        sa_relationship_kwargs={"viewonly": True},
    )

    ##
    # category_ids: Union[int, None] = Field(
    #     default=None, foreign_key="category.id", nullable=True
    # )
    # category: Union[Category, None] = Relationship(back_populates="products")

    ##
    # category_ids: List[int] = Field(default=None, foregin_key="category.ids")
    # categories: Optional[List[Category]] = Relationship(back_populates="products")

    ##
    # categories: list[Category] = Relationship(back_populates="products")


class ProductOut(ProductBase):
    id: int
    categories: list = None
    cart_links: list = None
    # products: list = None
    order_links: list = None
    orders: list = None

    # categories: List[Category] = None


class ProductOutOpen(SQLModel):
    id: int
    name: str
    url_key: str
    type: str
    sku: str
    price: float
    quantity: int
    images: List[str] = Field(default=None, sa_column=Column(ARRAY(String())))
    short_description: str
    description: str
    material: str
    weight: float
    size: str


# class ProductOutWithCategories(ProductOut):
#     categories: List[ProductOut] = []
