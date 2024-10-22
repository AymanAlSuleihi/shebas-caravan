from typing import Any
from uuid import UUID, uuid4
from fastapi import APIRouter, Depends
from pydantic.networks import EmailStr

from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.core.celery_app import celery_app
from app.models.msg import Message
from app.utils import send_contact_form_email, send_order_dispatched_email, send_new_order_email, send_test_email
from app.crud.crud_order import order as crud_order

router = APIRouter()


@router.get(
    "/generate-id",
    response_model=UUID
)
def generate_id() -> Any:
    """
    Generate a random uuid.
    """
    return uuid4()


@router.post(
    "/test-celery/",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=201,
)
def test_celery(body: Message) -> Message:
    """
    Test Celery worker.
    """
    celery_app.send_task("app.worker.test_celery", args=[body.message])
    return Message(message="Word received")


@router.post(
    "/contact-form-email",
)
def contact_form_email(name: str, email_from: str, message: str):
    """
    Send contact form email.
    """
    send_contact_form_email(name, email_from, message)
    return Message(message="Contact form sent")


@router.post(
    "/test-email/",
    dependencies=[Depends(get_current_active_superuser)],
    # status_code=201,
)
def test_email(email_to: EmailStr):
    """
    Test emails.
    """
    return send_test_email(email_to=email_to)
    return Message(message="Test email sent")


@router.post(
    "/test-email/new-order",
    dependencies=[Depends(get_current_active_superuser)],
)
def test_new_order_email(session: SessionDep, order_id: int):
    order = crud_order.get(db=session, id=order_id)
    customer = order.customer
    send_new_order_email(
        customer=customer.dict(),
        order=order.dict(),
    )
    return Message(message="Order email sent")


@router.post(
    "/test-email/order-dispatched",
    dependencies=[Depends(get_current_active_superuser)],
)
def test_order_dispatched_email(session: SessionDep, order_id: int):
    order = crud_order.get(db=session, id=order_id)
    customer = order.customer
    send_order_dispatched_email(
        customer=customer.dict(),
        order=order.dict(),
    )
    return Message(message="Dispatched email sent")
