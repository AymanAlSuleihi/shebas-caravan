from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.log import Log, LogCreate, LogUpdate

class CRUDLog(CRUDBase[Log, LogCreate, LogUpdate]):
    def create_by_customer(
      self,
      db: Session,
      *,
      obj_in: LogCreate,
      customer_id: int
    ) -> Log:
        log = self.create(db, obj_in=obj_in, customer_id=customer_id)
        return log

    def create_by_order(
      self,
      db: Session,
      *,
      obj_in: LogCreate,
      order_id: int
    ) -> Log:
        log = self.create(db, obj_in=obj_in, order_id=order_id)
        return log

    def create_by_product(
      self,
      db: Session,
      *,
      obj_in: LogCreate,
      product_id: int
    ) -> Log:
        log = self.create(db, obj_in=obj_in, product_id=product_id)
        return log 

log = CRUDLog(Log)
