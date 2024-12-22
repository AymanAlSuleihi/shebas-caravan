from dataclasses import asdict
from enum import IntEnum
import json
from typing import Dict, List, Optional

from app.models.product import ProductOut, ProductUpdate
from app.models.order import OrderCreate
from app.models.log import LogCreate
from app.core.config import settings
from app.crud.crud_product import product as crud_product
from app.crud.crud_cart import cart as crud_cart
from app.crud.crud_order import order as crud_order
from app.crud.crud_log import log as crud_log
from app.utils import send_new_order_email


class OrderStatus(IntEnum):
    PENDING = 0
    PROCESSING = 1
    SHIPPED = 2
    DELIVERED = 3
    CANCELLED = 4


def calculate_order_amount(db, products: List[Dict[str, int]]):
    amount = 0
    for product in products:
        db_product = crud_product.get(db, product["id"])
        if db_product:
            amount += db_product.price * product["quantity"]
    return amount


def cart_to_order(db, cart_id: str, payment: Optional[dict] = None):
    cart = crud_cart.get_by_unique_id(db, unique_id=cart_id)
    product_quantities = {
        link.product_id: link.cart_quantity
        for link in cart.product_links
    }
    order = crud_order.create_with_products_by_customer(
        db=db,
        obj_in=OrderCreate(
            amount=payment.amount * 0.01,
            ordered_product_data=[
                {
                    **json.loads(product.json()),
                    "order_quantity": product_quantities[product.id],
                }
                for product in cart.products
            ],
            shipping_address=cart.shipping_address,
            payment=payment if payment else cart.payment,
            status=cart.status,
        ),
        product_quantities={
            product.product_id: product.cart_quantity
            for product in cart.product_links
        },
        customer_id=cart.customer_id,
    )
    crud_log.create_by_order(
        db,
        obj_in=LogCreate(
            message="Order created",
            level="INFO",
        ),
        order_id=order.id,
    )
    for product in order.products:
        new_quantity = max(product.quantity - product_quantities[product.id], 0)
        crud_product.update(db, db_obj=product, obj_in=ProductUpdate(quantity=new_quantity))
    crud_cart.unlink_products_from_cart(
        db,
        cart_id=cart.id,
        product_ids=[link.product_id for link in cart.product_links],
    )
    crud_cart.remove(db, id=cart.id)
    send_new_order_email(
        customer=order.customer.dict(),
        order=order.dict(),
        emails_bcc=[settings.EMAILS_FROM_EMAIL],
    )
    return order
