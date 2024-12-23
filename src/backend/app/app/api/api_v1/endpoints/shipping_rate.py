from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func, asc, desc

from app.api.deps import (
    SessionDep,
    checker,
    get_current_active_superuser,
    get_current_active_superuser_no_error,
    get_current_user_no_error,
)
from app.crud.crud_shipping_rate import shipping_rate as crud_shipping_rate
from app.models.shipping_rate import (
    ShippingRate,
    ShippingRateCreate,
    ShippingRateOut,
    # ShippingRateOutOpen,
    ShippingRateUpdate,
    ShippingRatesOut,
)

router = APIRouter()

@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingRatesOut,
)
def read_shipping_rates(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve shipping rates.
    """
    total_count_statement = select(func.count()).select_from(ShippingRate)
    total_count = session.exec(total_count_statement).one()

    shipping_rates_statement = select(ShippingRate).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            shipping_rates_statement = shipping_rates_statement.where(
                getattr(ShippingRate, key) == value
            )

    if sort_field:
        if sort_order.lower() == "desc":
            shipping_rates_statement = shipping_rates_statement.order_by(desc(sort_field))
        else:
            shipping_rates_statement = shipping_rates_statement.order_by(asc(sort_field))

    shipping_rates = session.exec(shipping_rates_statement).all()

    return {
        "shipping_rates": shipping_rates,
        "count": total_count,
    }


@router.get(
    "/{shipping_rate_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingRateOut,
)
def read_shipping_rate(
    shipping_rate_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific shipping rate by id.
    """
    shipping_rate = session.get(ShippingRate, shipping_rate_id)
    if not shipping_rate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingRate not found",
        )
    return shipping_rate


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingRateOut,
)
def create_shipping_rate(
    *,
    session: SessionDep,
    shipping_rate_in: ShippingRateCreate,
) -> Any:
    """
    Create new shipping rate.
    """
    shipping_rate = session.get(ShippingRate, name=shipping_rate_in.name)
    if shipping_rate:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A rate with this name already exists in the system.",
        )
    shipping_rate = crud_shipping_rate.shipping_rate.create(db=session, obj_in=shipping_rate_in)
    return shipping_rate


@router.put(
    "/{shipping_rate_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingRateOut,
)
def update_shipping_rate(
    *,
    session: SessionDep,
    shipping_rate_id: int,
    shipping_rate_in: ShippingRateUpdate,
) -> Any:
    """
    Update a shipping rate.
    """
    shipping_rate = session.get(ShippingRate, shipping_rate_id)
    if not shipping_rate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shipping Zone not found."
        )
    shipping_rate = crud_shipping_rate.update(session, db_obj=shipping_rate, obj_in=shipping_rate_in)
    return shipping_rate


@router.delete(
    "/{shipping_rate_id}",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_shipping_rate(
    session: SessionDep,
    shipping_rate_id: int
) -> None:
    """
    Delete a shipping rate.
    """
    shipping_rate = session.get(ShippingRate, shipping_rate_id)
    if not shipping_rate:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingRate not found"
        )
    session.delete(shipping_rate)
    session.commit()
    return None


# @router.post(
#     "/{shipping_rate_id}/rates/{rate_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=ShippingRateOut,
# )
# def link_rate_to_rate(
#     *,
#     session: SessionDep,
#     shipping_rate_id: int,
#     rate_id: int
# ) -> Any:
#     """
#     Link a rate to a shipping rate.
#     """
#     shipping_rate = crud_shipping_rate.link_rate(
#         db=session,
#         rate_id=shipping_rate_id,
#         rate_id=rate_id
#     )
#     return shipping_rate


# @router.delete(
#     "/{shipping_rate_id}/rates/{rate_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=schemas.ShippingRate,
# )
# def unlink_rate_from_rate(
#     *,
#     session: SessionDep,
#     shipping_rate_id: int,
#     rate_id: int
# ) -> Any:
#     """
#     Unlink a rate from a shipping rate.
#     """
#     shipping_rate = crud.shipping_rate.unlink_rate(db=db, rate_id=rate_id, rate_id=rate_id)
#     return shipping_rate


# @router.post(
#     "/{shipping_rate_id}/rates/{shipping_rate_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=ShippingRateOut,
# )
# def link_rate_to_rate(
#     *,
#     session: SessionDep,
#     shipping_rate_id: int,
#     shipping_rate_id: int
# ) -> Any:
#     """
#     Link a rate to a shipping rate.
#     """
#     shipping_rate = crud_shipping_rate.link_rate(
#         db=session,
#         rate_id=shipping_rate_id,
#         rate_id=shipping_rate_id
#     )
#     return shipping_rate


# @router.delete(
#     "/{rate_id}/rates/{rate_id}",
#     dependencies=[Depends(deps.get_current_active_superuser)],
#     response_model=schemas.ShippingRate,
# )
# def unlink_rate_from_rate(
#     *,
#     db: Session = Depends(deps.get_db),
#     rate_id: int,
#     rate_id: int
# ) -> Any:
#     """
#     Unlink a rate from a shipping rate.
#     """
#     shipping_rate = crud.shipping_rate.unlink_rate(db=db, rate_id=rate_id, rate_id=rate_id)
#     return shipping_rate
