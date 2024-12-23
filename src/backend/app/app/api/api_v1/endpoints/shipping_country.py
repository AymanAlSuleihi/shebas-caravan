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
from app.crud.crud_shipping_country import shipping_country as crud_shipping_country
from app.models.shipping_country import (
    ShippingCountry,
    ShippingCountryCreate,
    ShippingCountryOut,
    # ShippingCountryOutOpen,
    ShippingCountryUpdate,
    ShippingCountriesOut,
)


router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingCountriesOut,
)
def read_shipping_countries(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve shipping countries.
    """
    total_count_statement = select(func.count()).select_from(ShippingCountry)
    total_count = session.exec(total_count_statement).one()

    shipping_countries_statement = select(ShippingCountry).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            shipping_countries_statement = shipping_countries_statement.where(
                getattr(ShippingCountry, key) == value
            )

    if sort_field:
        if sort_order.lower() == "desc":
            shipping_countries_statement = shipping_countries_statement.order_by(desc(sort_field))
        else:
            shipping_countries_statement = shipping_countries_statement.order_by(asc(sort_field))

    shipping_countries = session.exec(shipping_countries_statement).all()

    return {
        "shipping_countries": shipping_countries,
        "count": total_count,
    }


@router.get(
    "/{shipping_country_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingCountryOut,
)
def read_shipping_country(
    shipping_country_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific shipping country by id.
    """
    shipping_country = session.get(ShippingCountry, shipping_country_id)
    if not shipping_country:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingCountry not found",
        )
    return shipping_country


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingCountryOut,
)
def create_shipping_country(
    *,
    session: SessionDep,
    shipping_country_in: ShippingCountryCreate,
) -> Any:
    """
    Create new shipping country.
    """
    shipping_country = session.get(ShippingCountry, name=shipping_country_in.name)
    if shipping_country:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A country with this name already exists in the system.",
        )
    shipping_country = crud_shipping_country.shipping_country.create(db=session, obj_in=shipping_country_in)
    return shipping_country


@router.put(
    "/{shipping_country_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingCountryOut,
)
def update_shipping_country(
    *,
    session: SessionDep,
    shipping_country_id: int,
    shipping_country_in: ShippingCountryUpdate,
) -> Any:
    """
    Update a shipping country.
    """
    shipping_country = session.get(ShippingCountry, shipping_country_id)
    if not shipping_country:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shipping Zone not found."
        )
    shipping_country = crud_shipping_country.update(session, db_obj=shipping_country, obj_in=shipping_country_in)
    return shipping_country


@router.delete(
    "/{shipping_country_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=status.HTTP_204_NO_CONTENT,
)
def delete_shipping_country(
    session: SessionDep,
    shipping_country_id: int
) -> None:
    """
    Delete a shipping country.
    """
    shipping_country = session.get(ShippingCountry, shipping_country_id)
    if not shipping_country:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingCountry not found"
        )
    session.delete(shipping_country)
    session.commit()
    return None


# @router.post(
#     "/{shipping_country_id}/countries/{country_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=ShippingCountryOut,
# )
# def link_country_to_country(
#     *,
#     session: SessionDep,
#     shipping_country_id: int,
#     country_id: int
# ) -> Any:
#     """
#     Link a country to a shipping country.
#     """
#     shipping_country = crud_shipping_country.link_country(
#         db=session,
#         country_id=shipping_country_id,
#         country_id=country_id
#     )
#     return shipping_country


# @router.delete(
#     "/{shipping_country_id}/countries/{country_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=schemas.ShippingCountry,
# )
# def unlink_country_from_country(
#     *,
#     session: SessionDep,
#     shipping_country_id: int,
#     country_id: int
# ) -> Any:
#     """
#     Unlink a country from a shipping country.
#     """
#     shipping_country = crud.shipping_country.unlink_country(db=db, country_id=country_id, country_id=country_id)
#     return shipping_country


# @router.post(
#     "/{shipping_country_id}/rates/{shipping_rate_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=ShippingCountryOut,
# )
# def link_rate_to_country(
#     *,
#     session: SessionDep,
#     shipping_country_id: int,
#     shipping_rate_id: int
# ) -> Any:
#     """
#     Link a rate to a shipping country.
#     """
#     shipping_country = crud_shipping_country.link_rate(
#         db=session,
#         country_id=shipping_country_id,
#         rate_id=shipping_rate_id
#     )
#     return shipping_country


# @router.delete(
#     "/{country_id}/rates/{rate_id}",
#     dependencies=[Depends(deps.get_current_active_superuser)],
#     response_model=schemas.ShippingCountry,
# )
# def unlink_rate_from_country(
#     *,
#     db: Session = Depends(deps.get_db),
#     country_id: int,
#     rate_id: int
# ) -> Any:
#     """
#     Unlink a rate from a shipping country.
#     """
#     shipping_country = crud.shipping_country.unlink_rate(db=db, country_id=country_id, rate_id=rate_id)
#     return shipping_country
