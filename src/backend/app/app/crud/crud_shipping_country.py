from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.shipping_country import ShippingCountry, ShippingCountryCreate, ShippingCountryUpdate


class CRUDShippingCountry(CRUDBase[ShippingCountry, ShippingCountryCreate, ShippingCountryUpdate]):
    def link_to_zone(
        self, db: Session, *, country_id: int, zone_id: int
    ) -> Optional[ShippingCountry]:
        country = self.get(db, id=country_id)
        country.zone_id = zone_id
        db.add(country)
        db.commit()
        db.refresh(country)
        return country

    def unlink_from_zone(
        self, db: Session, *, country_id: int
    ) -> Optional[ShippingCountry]:
        country = self.get(db, id=country_id)
        country.zone_id = None
        db.add(country)
        db.commit()
        db.refresh(country)
        return country

shipping_country = CRUDShippingCountry(ShippingCountry)
