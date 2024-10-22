from datetime import datetime
from typing import Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.category import Category, CategoryCreate, CategoryUpdate
# from app.schemas.category import CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Category]:
        return db.query(Category).filter(Category.name == name).first()

    def get_by_url_key(self, db: Session, *, url_key: str) -> Optional[Category]:
        return db.query(Category).filter(Category.url_key == url_key).first()


category = CRUDCategory(Category)
