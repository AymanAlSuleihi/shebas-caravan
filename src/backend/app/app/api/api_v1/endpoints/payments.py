from datetime import datetime
import logging
import os
import sys
from typing import Any, Dict, List, Union
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from fastapi.encoders import jsonable_encoder
from sqlmodel import select
import stripe

from app.api.deps import (
    SessionDep,
    # get_current_active_superuser,
)
from app.crud.crud_cart import cart as crud_cart
from app.crud.crud_currency import currency as crud_currency
from app.models.cart import CartCreate, CartUpdate
from app.models.currency import Currency
from app.models.product import ProductOut
from app.services.commerce import calculate_order_amount, cart_to_order

from decimal import Decimal, ROUND_HALF_UP

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SEC_KEY_DEV")
endpoint_secret = os.getenv("STRIPE_ENDPOINT_SECRET")

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
stream_handler = logging.StreamHandler(sys.stdout)
log_formatter = logging.Formatter("%(asctime)s [%(processName)s: %(process)d] [%(threadName)s: %(thread)d] [%(levelname)s] %(name)s: %(message)s")
stream_handler.setFormatter(log_formatter)
logger.addHandler(stream_handler)


@router.post(
    "/calculate-order-total",
    response_model=Dict[str, dict],
)
def calculate_order_total(
    session: SessionDep,
    products: List[Dict[str, int]],
):
    return calculate_order_amount(session, products)


def format_amount(amount: float, db_currency: Currency) -> int:
    amount_decimal = Decimal(str(amount))

    if db_currency.stripe_zero_decimal:
        formatted = amount_decimal.quantize(Decimal("1."), rounding=ROUND_HALF_UP)
    else:
        formatted = amount_decimal.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP) * 100

    if db_currency.stripe_no_fraction:
        formatted = (formatted / 100).quantize(Decimal("100."), rounding=ROUND_HALF_UP)

    return int(formatted)


def convert_currency(value: float, db_currency: Currency, to_stripe: bool = True) -> Union[int, float]:
    value_decimal = Decimal(str(value))
    rate_decimal = Decimal(str(db_currency.rate))
    converted = value_decimal * rate_decimal

    if to_stripe:
        return format_amount(float(converted), db_currency)
    else:
        return float(converted.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))


def convert_amounts(amounts: dict, db_currency: Currency, to_stripe: bool = True) -> dict:
    converted = {
        "products": {},
        "totals": {},
    }
    for key, value in amounts["totals"].items():
        converted["totals"][key] = convert_currency(value, db_currency, to_stripe)
    for product_id, product_data in amounts["products"].items():
        converted["products"][product_id] = {
            field: convert_currency(value, db_currency, to_stripe)
            for field, value in product_data.items()
            if field in ["unit_price", "total"]
        }
        converted["products"][product_id]["quantity"] = product_data["quantity"]
    return converted


@router.post(
    "/create-payment-intent",
    response_model=Dict[str, str],
)
def create_payment(
    session: SessionDep,
    products: List[Dict[str, int]],
    country_id: int,
    shipping_rate_id: int,
    cart_id: str,
    currency: str = "GBP",
):
    try:
        amounts = calculate_order_amount(session, products, country_id, shipping_rate_id)
        db_currency = crud_currency.get_by_base_target(
            db=session,
            base_code="GBP",
            target_code=currency.upper(),
        )

        amounts_converted = convert_amounts(amounts, db_currency, to_stripe=True)
        amounts_converted_human = convert_amounts(amounts, db_currency, to_stripe=False)

        crud_cart.create(
            db=session,
            obj_in=CartCreate(
                status=0,
                unique_id=cart_id,
                payment_breakdown={
                    "base": amounts,
                    "converted": amounts_converted_human,
                    "currency": jsonable_encoder(db_currency),
                },
            ),
        )

        intent = stripe.PaymentIntent.create(
            amount=amounts_converted["totals"]["total"],
            currency=currency.lower(),
            automatic_payment_methods={"enabled": True},
            metadata={"cart_id": cart_id}
        )
        return {"clientSecret": intent["client_secret"]}
    except Exception as e:
        logger.error(e)
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )


@router.post(
    "/webhook",
    response_model=Dict[str, str],
)
async def webhook_received(
    request: Request,
    session: SessionDep,
):
    event = None
    payload = await request.body()
    sig_header = request.headers.get("Stripe-Signature")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        logger.debug("Payment intent received")
        logger.debug(payment_intent)
        cart_id = payment_intent.get("metadata", {}).get("cart_id")
        logger.debug("cart id")
        logger.debug(cart_id)
        order = cart_to_order(db=session, cart_id=cart_id, payment=payment_intent)
        logger.debug("Order created")
        logger.debug(order)
    else:
        print("Unhandled event type {}".format(event["type"]))

    return {"status": "success"}
