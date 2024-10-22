from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select

# from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.crud.crud_shipment import shipment as crud_shipment
from app.models.shipment import (
    Shipment,
    ShipmentCreate,
    ShipmentOut,
    ShipmentOutOpen,
    ShipmentUpdate,
)

router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=List[ShipmentOut],
)
def read_shipments(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve shipments.
    """
    statement = select(Shipment).offset(skip).limit(limit)
    shipments = session.exec(statement).all()
    return shipments


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShipmentOut,
)
def create_shipment_by_order(
    *,
    session: SessionDep,
    shipment_in: ShipmentCreate,
    order_id: int,
) -> Any:
    """
    Create new shipment by order.
    """
    shipment = crud_shipment.create_by_order(
        db=session,
        obj_in=shipment_in,
        order_id=order_id
    )
    return shipment


@router.get(
    "/{shipment_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShipmentOut,
)
def read_shipment_by_id(
    shipment_id: int, session: SessionDep
) -> Any:
    """
    Get a specific shipment by id.
    """
    shipment = session.get(Shipment, shipment_id)
    return shipment


@router.put(
    "/{shipment_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShipmentOut,
)
def update_shipment(
    *,
    session: SessionDep,
    shipment_id: int,
    shipment_in: ShipmentUpdate,
) -> Any:
    """
    Update an shipment
    """
    shipment = session.get(Shipment, shipment_id)
    if not shipment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The shipment does not exist in the system",
        )
    shipment = crud_shipment.update(session, db_obj=shipment, obj_in=shipment_in)
    return shipment


@router.delete(
    "/{shipment_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ShipmentOut,
)
def delete_shipment(
    session: SessionDep,
    shipment_id: int,
) -> Any:
    """
    Delete an shipment
    """
    shipment = crud_shipment.remove(session, shipment_id)
    if not shipment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The shipment does not exist in the system",
        )
    return shipment
