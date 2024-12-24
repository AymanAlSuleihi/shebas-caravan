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
from app.crud.crud_shipping_zone import shipping_zone as crud_shipping_zone
from app.models.shipping_zone import (
    ShippingZone,
    ShippingZoneCreate,
    ShippingZoneOut,
    # ShippingZoneOutOpen,
    ShippingZoneUpdate,
    ShippingZonesOut,
)


router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingZonesOut,
)
def read_shipping_zones(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve shipping zones.
    """
    total_count_statement = select(func.count()).select_from(ShippingZone)
    total_count = session.exec(total_count_statement).one()

    shipping_zones_statement = select(ShippingZone).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            shipping_zones_statement = shipping_zones_statement.where(
                getattr(ShippingZone, key) == value
            )

    if sort_field:
        if sort_order.lower() == "desc":
            shipping_zones_statement = shipping_zones_statement.order_by(desc(sort_field))
        else:
            shipping_zones_statement = shipping_zones_statement.order_by(asc(sort_field))

    shipping_zones = session.exec(shipping_zones_statement).all()

    return {
        "shipping_zones": shipping_zones,
        "count": total_count,
    }


@router.get(
    "/{shipping_zone_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingZoneOut,
)
def read_shipping_zone(
    shipping_zone_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific shipping zone by id.
    """
    shipping_zone = session.get(ShippingZone, shipping_zone_id)
    if not shipping_zone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingZone not found",
        )
    return shipping_zone


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingZoneOut,
)
def create_shipping_zone(
    *,
    session: SessionDep,
    shipping_zone_in: ShippingZoneCreate,
) -> Any:
    """
    Create new shipping zone.
    """
    shipping_zone = crud_shipping_zone.get_by_name(db=session, name=shipping_zone_in.name)
    if shipping_zone:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A zone with this name already exists in the system.",
        )
    shipping_zone = crud_shipping_zone.create(db=session, obj_in=shipping_zone_in)
    return shipping_zone


@router.put(
    "/{shipping_zone_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingZoneOut,
)
def update_shipping_zone(
    *,
    session: SessionDep,
    shipping_zone_id: int,
    shipping_zone_in: ShippingZoneUpdate,
) -> Any:
    """
    Update a shipping zone.
    """
    shipping_zone = session.get(ShippingZone, shipping_zone_id)
    if not shipping_zone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shipping Zone not found."
        )
    shipping_zone = crud_shipping_zone.update(session, db_obj=shipping_zone, obj_in=shipping_zone_in)
    return shipping_zone


@router.delete(
    "/{shipping_zone_id}",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_shipping_zone(
    session: SessionDep,
    shipping_zone_id: int
) -> None:
    """
    Delete a shipping zone.
    """
    shipping_zone = session.get(ShippingZone, shipping_zone_id)
    if not shipping_zone:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ShippingZone not found"
        )
    session.delete(shipping_zone)
    session.commit()
    return None


@router.post(
    "/{shipping_zone_id}/countries/{country_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingZoneOut,
)
def link_country_to_zone(
    *,
    session: SessionDep,
    shipping_zone_id: int,
    country_id: int
) -> Any:
    """
    Link a country to a shipping zone.
    """
    shipping_zone = crud_shipping_zone.link_country(
        db=session,
        zone_id=shipping_zone_id,
        country_id=country_id
    )
    return shipping_zone


# @router.delete(
#     "/{shipping_zone_id}/countries/{country_id}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_model=schemas.ShippingZone,
# )
# def unlink_country_from_zone(
#     *,
#     session: SessionDep,
#     shipping_zone_id: int,
#     country_id: int
# ) -> Any:
#     """
#     Unlink a country from a shipping zone.
#     """
#     shipping_zone = crud.shipping_zone.unlink_country(db=db, zone_id=zone_id, country_id=country_id)
#     return shipping_zone


@router.post(
    "/{shipping_zone_id}/rates/{shipping_rate_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShippingZoneOut,
)
def link_rate_to_zone(
    *,
    session: SessionDep,
    shipping_zone_id: int,
    shipping_rate_id: int
) -> Any:
    """
    Link a rate to a shipping zone.
    """
    shipping_zone = crud_shipping_zone.link_rate(
        db=session,
        zone_id=shipping_zone_id,
        rate_id=shipping_rate_id
    )
    return shipping_zone


# @router.delete(
#     "/{zone_id}/rates/{rate_id}",
#     dependencies=[Depends(deps.get_current_active_superuser)],
#     response_model=schemas.ShippingZone,
# )
# def unlink_rate_from_zone(
#     *,
#     db: Session = Depends(deps.get_db),
#     zone_id: int,
#     rate_id: int
# ) -> Any:
#     """
#     Unlink a rate from a shipping zone.
#     """
#     shipping_zone = crud.shipping_zone.unlink_rate(db=db, zone_id=zone_id, rate_id=rate_id)
#     return shipping_zone
