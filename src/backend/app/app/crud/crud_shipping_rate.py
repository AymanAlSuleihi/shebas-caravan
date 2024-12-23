from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.shipping_rate import ShippingRate, ShippingRateCreate, ShippingRateUpdate


class CRUDShippingRate(CRUDBase[ShippingRate, ShippingRateCreate, ShippingRateUpdate]):
    def link_to_zone(
        self, db: Session, *, rate_id: int, zone_id: int
    ) -> Optional[ShippingRate]:
        rate = self.get(db, id=rate_id)
        rate.zone_id = zone_id
        db.add(rate)
        db.commit()
        db.refresh(rate)
        return rate

    def unlink_from_zone(
        self, db: Session, *, rate_id: int
    ) -> Optional[ShippingRate]:
        rate = self.get(db, id=rate_id)
        rate.zone_id = None
        db.add(rate)
        db.commit()
        db.refresh(rate)
        return rate

shipping_rate = CRUDShippingRate(ShippingRate)
