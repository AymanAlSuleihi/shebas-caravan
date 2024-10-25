from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func, asc, desc

# from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.crud.crud_customer import customer as crud_customer
from app.models.customer import (
    Customer,
    CustomerCreate,
    CustomerOut,
    CustomerUpdate,
    CustomersOut,
)

router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CustomersOut,
)
def read_customers(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve customers.
    """
    total_count_statement = select(func.count()).select_from(Customer)
    total_count = session.exec(total_count_statement).one()

    customers_statement = select(Customer).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            customers_statement = customers_statement.where(getattr(Customer, key) == value)

    if sort_field:
        if sort_order.lower() == "desc":
            customers_statement = customers_statement.order_by(desc(sort_field))
        else:
            customers_statement = customers_statement.order_by(asc(sort_field))

    customers = session.exec(customers_statement).all()

    return {
        "customers": customers,
        "count": total_count,
    }


@router.post(
    "/",
    response_model=CustomerOut,
)
def create_customer(*, session: SessionDep, customer_in: CustomerCreate) -> Any:
    """
    Create new customer.
    """
    customer = crud_customer.get_by_email(db=session, email=customer_in.email)
    if customer:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A customer with this email already exists in the system.",
        )

    customer = crud_customer.create(db=session, obj_in=customer_in)
    return customer


@router.get(
    "/{customer_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CustomerOut,
)
def read_customer_by_id(
    customer_id: int, session: SessionDep
) -> Any:
    """
    Get a specific customer by id.
    """
    customer = session.get(Customer, customer_id)
    return customer


@router.get(
    "/email/{customer_email}",
    response_model=int,
)
def read_customer_id_by_email(
    customer_email: str, session: SessionDep
) -> Any:
    """
    Get a specific customer id by email.
    """
    customer = crud_customer.get_by_email(db=session, email=customer_email)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="A customer with this email does not exist in the system",
        )
    return customer.id


@router.put(
    "/{customer_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CustomerOut,
)
def update_customer(
    *,
    session: SessionDep,
    customer_id: int,
    customer_in: CustomerUpdate,
) -> Any:
    """
    Update a customer
    """
    customer = session.get(Customer, customer_id)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The customer does not exist in the system",
        )
    customer = crud_customer.update(session, db_obj=customer, obj_in=customer_in)
    return customer


@router.delete(
    "/{customer_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CustomerOut,
)
def delete_customer(
    session: SessionDep,
    customer_id: int,
) -> Any:
    """
    Delete a customer
    """
    customer = crud_customer.remove(session, customer_id)
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The customer does not exist in the system",
        )
    return customer
