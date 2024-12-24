from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.shipping_zone import ShippingZone, ShippingZoneCreate, ShippingZoneUpdate


class CRUDShippingZone(CRUDBase[ShippingZone, ShippingZoneCreate, ShippingZoneUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[ShippingZone]:
        return db.query(ShippingZone).filter(ShippingZone.name == name).first()

    def link_country(
        self, db: Session, *, zone_id: int, country_id: int
    ) -> Optional[ShippingZone]:
        zone = self.get(db, id=zone_id)
        country = db.query(ShippingCountry).get(country_id)
        country.zone_id = zone_id
        db.add(country)
        db.commit()
        db.refresh(zone)
        return zone

    def unlink_country(
        self, db: Session, *, zone_id: int, country_id: int
    ) -> Optional[ShippingZone]:
        zone = self.get(db, id=zone_id)
        country = db.query(ShippingCountry).get(country_id)
        country.zone_id = None
        db.add(country)
        db.commit()
        db.refresh(zone)
        return zone

    def link_rate(
        self, db: Session, *, zone_id: int, rate_id: int
    ) -> Optional[ShippingZone]:
        zone = self.get(db, id=zone_id)
        rate = db.query(ShippingRate).get(rate_id)
        rate.zone_id = zone_id
        db.add(rate)
        db.commit()
        db.refresh(zone)
        return zone

    def unlink_rate(
        self, db: Session, *, zone_id: int, rate_id: int
    ) -> Optional[ShippingZone]:
        zone = self.get(db, id=zone_id)
        rate = db.query(ShippingRate).get(rate_id)
        rate.zone_id = None
        db.add(rate)
        db.commit()
        db.refresh(zone)
        return zone

shipping_zone = CRUDShippingZone(ShippingZone)
