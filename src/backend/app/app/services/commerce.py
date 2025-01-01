from enum import IntEnum
import json
from typing import Dict, List, Optional, Union
from py3dbp import Packer, Bin, Item
from copy import deepcopy
from itertools import groupby

from app.models.product import ProductUpdate
from app.models.order import OrderCreate
from app.models.log import LogCreate
from app.models.shipping_rate import ShippingRate
from app.core.config import settings
from app.crud.crud_product import product as crud_product
from app.crud.crud_cart import cart as crud_cart
from app.crud.crud_order import order as crud_order
from app.crud.crud_log import log as crud_log
from app.crud.crud_product import product as crud_product
from app.crud.crud_shipping_country import shipping_country as crud_shipping_country

from app.utils import send_new_order_email


class OrderStatus(IntEnum):
    PENDING = 0
    PROCESSING = 1
    SHIPPED = 2
    DELIVERED = 3
    CANCELLED = 4


def calculate_order_amount(
    db,
    products: List[Dict[str, int]],
    country_id: int = None,
    shipping_rate_id: int = None
) -> Dict[str, dict]:
    subtotal = 0
    shipping = 0
    tax = 0 # TODO: Implement tax calculation
    products_breakdown = {}

    for product in products:
        db_product = crud_product.get(db, product["id"])
        if db_product:
            products_breakdown[str(db_product.id)] = {
                "unit_price": db_product.price,
                "quantity": product["quantity"],
                "total": db_product.price * product["quantity"],
            }
            subtotal += db_product.price * product["quantity"]

    if country_id and shipping_rate_id:
        shipping_rates = get_shipping_rates(
            db=db,
            country_id=country_id,
            product_ids=[product["id"] for product in products],
        )
        if isinstance(shipping_rates, list):
            selected_rate = next(
                (rate for rate in shipping_rates if rate.id == shipping_rate_id), None)
            if selected_rate:
                shipping = selected_rate.price

    total = subtotal + shipping

    return {
        "products": products_breakdown,
        "totals": {
            "subtotal": subtotal,
            "shipping": shipping,
            "tax": tax,
            "total": total,
        },
    }


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
            shipping_rate_data=cart.shipping_rate_data,
            payment=payment if payment else cart.payment,
            payment_breakdown=cart.payment_breakdown,
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


def pack_items(
    packer: Packer,
    package_dimensions: dict,
    items: list,
    packed_bins: list = None,
) -> list:
    if packed_bins is None:
        packed_bins = []

    if not items:
        return packed_bins

    for index, (name, dim) in enumerate(package_dimensions.items()):
        bin = Bin(name, dim[0], dim[1], dim[2], 100)
        packer.bins = []
        packer.items = []
        packer.add_bin(bin)

        for item in items:
            packer.add_item(item)

        packer.pack()

        if not bin.unfitted_items:
            packed_bins.append(bin)
            return packed_bins

        if index == len(package_dimensions) - 1:
            if len(bin.unfitted_items) < len(items):
                packed_bins.append(bin)
                return pack_items(packer, package_dimensions, bin.unfitted_items, packed_bins)

    return packed_bins


def get_shipping_rates(
    db,
    country_id: int,
    product_ids: List[int],
) -> Union[Dict[str, str], List[ShippingRate]]:
    country = crud_shipping_country.get(db=db, id=country_id)
    if not country:
        return {"error": "Country not found", "status_code": 404}
    zone = country.zone
    if not zone:
        return {"error": "Country zone not found", "status_code": 404}

    shipping_rates = zone.rates
    if not shipping_rates:
        return {"error": "Shipping rates not found", "status_code": 404}

    products = [crud_product.get(db, product_id) for product_id in product_ids]

    packer = Packer()

    package_dimensions = {
        "Large Letter": [35.3, 25.0, 2.5],
        "Small Parcel": [45.0, 35.0, 16.0],
        # "Medium Parcel": [61.0, 46.0, 46.0],
    }

    items = []
    for product in products:
        items.append(Item(
            product.sku,
            product.package_dimensions[0],
            product.package_dimensions[1],
            product.package_dimensions[2],
            product.weight,
        ))

    packed_packages = pack_items(packer, package_dimensions, items)

    product_costs = {product.sku: product.cost for product in products}
    packs_used = []
    for package in packed_packages:
        packs_used.append({
            "name": package.name,
            "value": sum([product_costs[item.name] for item in package.items]),
        })

    def aggregate_rates(rates):
        sorted_rates = sorted(rates, key=lambda x: (x.service_name))
        grouped_rates = []
        for key, group in groupby(sorted_rates, key=lambda x: (x.service_name)):
            group_list = list(group)
            base_rate = deepcopy(group_list[0])
            base_rate.price = sum(r.price for r in group_list)
            base_rate.cost = sum(r.cost for r in group_list)
            grouped_rates.append(base_rate)
        return grouped_rates

    rates = []
    for pack in packs_used:
        pack_rates = [rate for rate in shipping_rates if rate.package_size_name == pack["name"]]
        by_service = {}
        for rate in pack_rates:
            if rate.service_name not in by_service:
                by_service[rate.service_name] = []
            by_service[rate.service_name].append(rate)
        
        filtered_rates = []
        for service_rates in by_service.values():
            insured_rates = [r for r in service_rates if r.insurance >= pack["value"]]
            if insured_rates:
                selected_rate = min(insured_rates, key=lambda x: x.price)
            else:
                selected_rate = max(service_rates, key=lambda x: x.insurance)
            
            rate_copy = deepcopy(selected_rate)
            if pack["value"] > rate_copy.insurance:
                rate_copy.price += 5 # TODO: Adjust insurance surcharge

            filtered_rates.append(rate_copy)
        rates.extend(filtered_rates)

    return aggregate_rates(rates)
