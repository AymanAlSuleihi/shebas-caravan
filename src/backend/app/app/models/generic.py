from typing import List, Optional, Union

from sqlmodel import Field, Relationship, SQLModel


class ProductCartLink(SQLModel, table=True):
    product_id: Optional[int] = Field(
        default=None, foreign_key="product.id", primary_key=True
    )
    cart_id: Optional[int] = Field(
        default=None, foreign_key="cart.id", primary_key=True
    )
    cart_quantity: int

    product: "Product" = Relationship(back_populates="cart_links")
    cart: "Cart" = Relationship(back_populates="product_links")


class ProductCategoryLink(SQLModel, table=True):
    product_id: Optional[int] = Field(
        default=None, foreign_key="product.id", primary_key=True
    )
    category_id: Optional[int] = Field(
        default=None, foreign_key="category.id", primary_key=True
    )


class ProductOrderLink(SQLModel, table=True):
    product_id: Optional[int] = Field(
        default=None, foreign_key="product.id", primary_key=True, ondelete="CASCADE",
    )
    order_id: Optional[int] = Field(
        default=None, foreign_key="order.id", primary_key=True, ondelete="CASCADE",
    )
    order_quantity: int

    product: "Product" = Relationship(back_populates="order_links")
    order: "Order" = Relationship(back_populates="product_links")
