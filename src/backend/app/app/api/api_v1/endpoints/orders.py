from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func, desc, asc

# from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.crud.crud_order import order as crud_order
from app.models.order import (
    Order,
    OrderCreate,
    OrderOut,
    OrderOutOpen,
    OrderUpdate,
    OrdersOut,
)
from app.services.commerce import OrderStatus
from app.utils import send_order_dispatched_email

router = APIRouter()


@router.get(
    "/order-status",
    response_model=dict,
)
def order_status() -> dict:
    return {status.name: status.value for status in OrderStatus}


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrdersOut,
)
def read_orders(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve orders.
    """
    total_count_statement = select(func.count()).select_from(Order)
    total_count = session.exec(total_count_statement).one()

    orders_statement = select(Order).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            orders_statement = orders_statement.where(getattr(Order, key) == value)

    if sort_field:
        if sort_order.lower() == "desc":
            orders_statement = orders_statement.order_by(desc(sort_field))
        else:
            orders_statement = orders_statement.order_by(asc(sort_field))

    orders = session.exec(orders_statement).all()

    return {
        "orders": orders,
        "count": total_count,
    }


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def create_order(*, session: SessionDep, order_in: OrderCreate) -> Any:
    """
    Create new order.
    """
    order = crud_order.create(db=session, obj_in=order_in)
    return order


@router.get(
    "/{order_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def read_order_by_id(
    order_id: int, session: SessionDep
) -> Any:
    """
    Get a specific order by id.
    """
    order = session.get(Order, order_id)
    return order


@router.get(
    "/payment-id/{payment_id}",
    response_model=OrderOutOpen,
)
def read_order_by_payment_id(
    payment_id: str, session: SessionDep
) -> Any:
    """
    Get a specific order by payment id.
    """
    order = crud_order.get_by_payment_id(db=session, payment_id=payment_id)
    return order


@router.put(
    "/{order_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def update_order(
    *,
    session: SessionDep,
    order_id: int,
    order_in: OrderUpdate,
) -> Any:
    """
    Update an order
    """
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The order does not exist in the system",
        )
    order = crud_order.update(session, db_obj=order, obj_in=order_in)
    return order


@router.put(
    "/{order_id}/add-products",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def add_products_to_order(
    *,
    session: SessionDep,
    order_id: int,
    product_ids: List[int],
) -> Any:
    """
    Add products to an order
    """
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The order does not exist in the system",
        )
    order = crud_order.link_products_to_order(session, order_id, product_ids)
    return order


@router.put(
    "/{order_id}/dispatch",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def dispatch_order(
    *,
    session: SessionDep,
    order_id: int,
    shipment_ids: List[int],
) -> Any:
    """
    Dispatch Order
    """
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="The order does not exist in the system",
        )
    send_order_dispatched_email(
        order.customer.dict(),
        order.dict(),
        [shipment.dict() for shipment in order.shipments],
        shipment_ids,
    )
    updated_order = crud_order.update(
        session,
        db_obj=order,
        obj_in=OrderUpdate(
            status=OrderStatus.SHIPPED,
        ),
    )
    return updated_order


@router.put(
    "/{order_id}/cancel",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def cancel_order(
    *,
    session: SessionDep,
    order_id: int,
    refund_amount: Optional[float] = 0,
) -> Any:
    """
    Cancel Order
    """
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            details="The order does not exist in the system",
        )

    # TODO: Add refund logic

    # TODO: Send cancelled email

    updated_order = crud_order.update(
        session,
        db_obj=order,
        obj_in=OrderUpdate(
            status=OrderStatus.CANCELLED,
        ),
    )
    return updated_order


@router.delete(
    "/{order_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def delete_order(
    session: SessionDep,
    order_id: int,
) -> Any:
    """
    Delete an order
    """
    order = crud_order.remove(session, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The order does not exist in the system",
        )
    return order
