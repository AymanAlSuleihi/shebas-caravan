from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.customer import Customer, CustomerCreate, CustomerUpdate
# from app.schemas.customer import CustomerCreate, CustomerUpdate


class CRUDCustomer(CRUDBase[Customer, CustomerCreate, CustomerUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[Customer]:
        return db.query(Customer).filter(Customer.email == email).first()


customer = CRUDCustomer(Customer)
