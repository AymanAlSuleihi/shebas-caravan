from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.currency import Currency, CurrencyCreate, CurrencyUpdate


class CRUDCurrency(CRUDBase[Currency, CurrencyCreate, CurrencyUpdate]):
    def get_by_base(self, db: Session, *, base_code: str) -> Optional[Currency]:
        return db.query(Currency).filter(Currency.base_code == base_code).first()

    def get_by_base_target(
        self,
        db: Session,
        *,
        base_code: str,
        target_code: str,
    ) -> Optional[Currency]:
        return db.query(Currency).filter(
            Currency.base_code == base_code,
            Currency.target_code == target_code,
        ).first()

currency = CRUDCurrency(Currency)
