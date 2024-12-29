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
from app.crud.crud_product import product as crud_product
from app.crud.crud_shipping_country import shipping_country as crud_shipping_country
from app.models.shipping_rate import (
    ShippingRate,
    ShippingRateCreate,
    ShippingRateOut,
    ShippingRateOutOpen,
    # ShippingRateOutOpen,
    ShippingRateUpdate,
    ShippingRatesOut,
)
from app.services.commerce import get_shipping_rates

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


@router.get(
    "/product/{product_id}",
    response_model=Union[List[ShippingRateOut], List[ShippingRateOutOpen]],
)
def read_shipping_rates_for_product(
    session: SessionDep,
    product_id: int,
    country_id: Optional[int] = None,
    current_user = Depends(get_current_user_no_error),
) -> Any:
    """
    Get all shipping rates for a product.
    """
    country = crud_shipping_country.get(db=session, id=country_id)
    if not country:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Country not found",
        )
    zone = country.zone
    if not zone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Country Zone not found",
        )
    shipping_rates = zone.rates
    if not shipping_rates:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingRates not found",
        )

    product = crud_product.get(db=session, id=product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    parcel_size = "Large Letter" if all([
            float(dim) <= float(max_dim) for dim, max_dim in zip(
                sorted(product.package_dimensions), [35.3, 25, 2.5]
            )
        ]) else "Small Parcel"
    
    if parcel_size == "Large Letter":
        shipping_rates = [rate for rate in shipping_rates if rate.package_size_name == "Large Letter"]
    else:
        shipping_rates = [rate for rate in shipping_rates if rate.package_size_name == "Small Parcel"]

    if country.name != "United Kingdom":
        shipping_rates = [rate for rate in shipping_rates if product.cost <= rate.insurance]

    unique_shipping_rates = {}
    for rate in shipping_rates:
        if rate.service_name not in unique_shipping_rates or rate.price < unique_shipping_rates[rate.service_name].price:
            unique_shipping_rates[rate.service_name] = rate
    shipping_rates = list(unique_shipping_rates.values())

    if current_user:
        shipping_rates_out = [ShippingRateOut.from_orm(rate) for rate in shipping_rates]
    else:
        shipping_rates_out = [ShippingRateOutOpen.from_orm(rate) for rate in shipping_rates]

    return shipping_rates_out


@router.post(
    "/pack_items",
    response_model=Union[List[ShippingRateOut], List[ShippingRateOutOpen]],
)
def pack_items(
    *,
    session: SessionDep,
    product_ids: List[int],
    country_id: int,
    current_user = Depends(get_current_user_no_error),
) -> Any:
    """
    Pack items into parcels.
    """
    if current_user:
        shipping_rates = [
            ShippingRateOut.from_orm(r) for r in get_shipping_rates(
                session, country_id=country_id, product_ids=product_ids
            )]
    else:
        shipping_rates = [
            ShippingRateOutOpen.from_orm(r) for r in get_shipping_rates(
                session, country_id=country_id, product_ids=product_ids
            )]
    return shipping_rates


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
