import logging
import os
import sys
from typing import Any, Dict, List
from uuid import UUID

from fastapi import APIRouter, Depends, Header, HTTPException, Request, status
from sqlmodel import select
import stripe

from app.api.deps import (
    SessionDep,
    # get_current_active_superuser,
)
from app.models.product import ProductOut
from app.services.commerce import calculate_order_amount, cart_to_order

router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SEC_KEY_DEV")
endpoint_secret = os.getenv("STRIPE_ENDPOINT_SECRET")

# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
stream_handler = logging.StreamHandler(sys.stdout)
log_formatter = logging.Formatter("%(asctime)s [%(processName)s: %(process)d] [%(threadName)s: %(thread)d] [%(levelname)s] %(name)s: %(message)s")
stream_handler.setFormatter(log_formatter)
logger.addHandler(stream_handler)


@router.post(
    "/calculate-order-total",
)
def calculate_order_total(
    session: SessionDep,
    products: List[Dict[str, int]],
):
    return calculate_order_amount(session, products)


@router.post(
    "/create-payment-intent",
)
def create_payment(
    session: SessionDep,
    products: List[Dict[str, int]],
    cart_id: str,
):
    try:
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            amount=int(round(calculate_order_amount(session, products), 2) * 100),
            currency="gbp",
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                "enabled": True,
            },
            metadata={
                "cart_id": cart_id,
            },
        )
        return {"clientSecret": intent["client_secret"]}
    except Exception as e:
        raise HTTPException(
            status_code=403,
            detail=str(e),
        )


@router.post(
    "/webhook",
)
async def webhook_received(
    request: Request,
    session: SessionDep,
    # sig_header: str = Header(None),
):
    event = None
    payload = await request.body()
    # logger.debug("Payload")
    # logger.debug(payload)
    # logger.debug("Headers")
    # logger.debug(request.headers)
    sig_header = request.headers.get("Stripe-Signature")
    # logger.debug("sig_header")
    # logger.debug(sig_header)
    # logger.debug(request.headers.get("stripe-signature"))

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret #os.environ.get("STRIPE_WEBHOOK_SECRET")
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e
    
    # logger.debug("Webhook payload")
    # logger.debug(payload)

    # logger.debug("Webhook event")
    # logger.debug(event)

    # Handle the event
    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
        logger.debug("Payment intent received")
        logger.debug(payment_intent)
        cart_id = payment_intent.get("metadata", []).get("cart_id")
        logger.debug("cart id")
        logger.debug(cart_id)
        order = cart_to_order(db=session, cart_id=cart_id, payment=payment_intent)
        logger.debug("Order created")
        logger.debug(order)
    # ... handle other event types
    else:
        print("Unhandled event type {}".format(event["type"]))

    return {"status": "success"}
