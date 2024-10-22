from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.shipment import Shipment, ShipmentCreate, ShipmentUpdate


class CRUDShipment(CRUDBase[Shipment, ShipmentCreate, ShipmentUpdate]):
    def create_by_order(
        self,
        db: Session,
        *,
        obj_in: ShipmentCreate,
        order_id: int,
    ) -> Shipment:
        shipment = self.create(db, obj_in=obj_in, order_id=order_id)
        return shipment

shipment = CRUDShipment(Shipment)
