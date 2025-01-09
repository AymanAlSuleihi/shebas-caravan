from typing import Any, Dict, List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func, desc, asc
import stripe

# from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.core.config import settings
from app.crud.crud_order import order as crud_order
from app.crud.crud_log import log as crud_log
from app.models.category import Category
from app.models.generic import ProductCategoryLink, ProductOrderLink
from app.models.log import LogCreate
from app.models.order import (
    Order,
    OrderCreate,
    OrderOut,
    OrderOutOpen,
    OrderUpdate,
    OrdersOut,
)
from app.models.product import Product
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
            detail="The order does not exist in the system",
        )
    send_order_dispatched_email(
        customer=order.customer.dict(),
        order=order.dict(),
        shipments=[shipment.dict() for shipment in order.shipments],
        new_shipment_ids=shipment_ids,
        emails_bcc=[settings.EMAILS_FROM_EMAIL],
    )
    updated_order = crud_order.update(
        session,
        db_obj=order,
        obj_in=OrderUpdate(
            status=OrderStatus.SHIPPED,
        ),
    )
    crud_log.create_by_order(
        session,
        obj_in=LogCreate(
            message="Order dispatched",
            level="INFO",
        ),
        order_id=order_id,
    )
    return updated_order


@router.put(
    "/{order_id}/refund",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=OrderOut,
)
def refund_order(
    *,
    session: SessionDep,
    order_id: int,
    refund_amount: Optional[float] = None,
    cancel_order: Optional[bool] = False,
) -> Any:
    """
    Refund Order
    """
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The order does not exist in the system",
        )

    if refund_amount:
        if refund_amount > order.amount:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The refund amount is greater than the order amount",
            )
    else:
        refund_amount = order.amount

    if cancel_order:
        if order.status == OrderStatus.CANCELLED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="The order has already been cancelled",
            )

    refund = stripe.Refund.create(
        payment_intent=order.payment["id"],
        amount=int(refund_amount * 100),
    )
    if not refund or refund["status"] != "succeeded":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The refund could not be processed",
        )

    status = OrderStatus.CANCELLED if cancel_order else order.status
    order = crud_order.update(
        session,
        db_obj=order,
        obj_in=OrderUpdate(
            status=status,
            refunds=order.refunds + [refund.to_dict()],
        ),
    )
    crud_log.create_by_order(
        session,
        obj_in=LogCreate(
            message=f"Refund of {refund_amount} {refund.currency} processed",
            level="INFO",
        ),
        order_id=order_id,
    )
    if status != order.status:
        crud_log.create_by_order(
            session,
            obj_in=LogCreate(
                message=f"Order status updated to {status}",
                level="INFO",
            ),
            order_id=order_id,
        )

    # TODO: send cancellation/refund email

    return order


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


@router.get(
    "/stats/sales-data",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, List[Dict[str, Any]]]
)
def get_sales_data(
    session: SessionDep,
    start_date: str,
    end_date: str,
    interval: str = "day"
) -> Any:
    """Get sales data for period and previous period"""
    interval_date = func.date_trunc(interval, Order.created_at).label("interval_date")

    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")

    statement = select(
        interval_date,
        func.sum(Order.amount).label("revenue"),
        func.count(Order.id).label("orders"),
    ).where(
        Order.created_at >= start_date,
        Order.created_at <= end_date,
    ).group_by(
        interval_date,
    ).order_by(
        interval_date,
    )

    results = session.exec(statement).all()
    current_period_data = [
        {
            "date": result.interval_date.strftime("%Y-%m-%d"),
            "revenue": round(float(result.revenue or 0), 2),
            "orders": int(result.orders or 0),
        }
        for result in results
    ]

    # Calculate the previous period dates
    previous_start_date = start_date - (end_date - start_date)
    previous_end_date = start_date

    previous_statement = select(
        interval_date,
        func.sum(Order.amount).label("revenue"),
        func.count(Order.id).label("orders"),
    ).where(
        Order.created_at >= previous_start_date,
        Order.created_at <= previous_end_date,
    ).group_by(
        interval_date,
    ).order_by(
        interval_date,
    )

    previous_results = session.exec(previous_statement).all()
    previous_period_data = [
        {
            "date": result.interval_date.strftime("%Y-%m-%d"),
            "revenue": round(float(result.revenue or 0), 2),
            "orders": int(result.orders or 0)
        }
        for result in previous_results
    ]

    return {
        "current_period": current_period_data,
        "previous_period": previous_period_data,
    }



@router.get(
    "/stats/sales-by-category",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=List[Dict[str, Any]]
)
def get_sales_by_category(
    session: SessionDep,
    start_date: str,
    end_date: str
) -> Any:
    """Get sales by category for a given period"""
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")

    statement = select(
        Category.name.label("category"),
        func.sum(Order.amount).label("sales"),
    ).join(
        ProductOrderLink, ProductOrderLink.order_id == Order.id,
    ).join(
        Product, Product.id == ProductOrderLink.product_id,
    ).join(
        ProductCategoryLink, ProductCategoryLink.product_id == Product.id,
    ).join(
        Category, Category.id == ProductCategoryLink.category_id,
    ).where(
        Order.created_at >= start_date,
        Order.created_at <= end_date,
    ).group_by(
        Category.name,
    ).order_by(
        desc("sales"),
    )

    results = session.exec(statement).all()
    return [
        {
            "category": result.category,
            "sales": round(float(result.sales or 0), 2),
        }
        for result in results
    ]


@router.get(
    "/stats/orders-per-status",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, int]
)
def get_orders_per_status(
    session: SessionDep,
    start_date: str,
    end_date: str
) -> Any:
    """Get count of orders per status"""
    start_date = datetime.strptime(start_date, "%Y-%m-%d")
    end_date = datetime.strptime(end_date, "%Y-%m-%d")

    statement = select(
        Order.status,
        func.count(Order.id).label("count"),
    ).where(
        Order.created_at >= start_date,
        Order.created_at <= end_date,
    ).group_by(
        Order.status,
    )

    results = session.exec(statement).all()
    orders_per_status = {result.status: result.count for result in results}

    return orders_per_status
