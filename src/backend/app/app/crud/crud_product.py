from datetime import datetime
from typing import List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.product import Product, ProductCreate, ProductUpdate
from app.models.category import Category
from app.models.generic import ProductCategoryLink


class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_by_sku(self, db: Session, *, sku: str) -> Optional[Product]:
        return db.query(Product).filter(Product.sku == sku).first()

    def get_by_url_key(self, db: Session, *, url_key: str) -> Optional[Product]:
        return db.query(Product).filter(Product.url_key == url_key).first()

    def get_by_category(self, db: Session, *, category_id: int) -> Optional[Product]:
        return db.query(Product).filter(Product.categories.any(Category.id == category_id))

    def create_with_categories(
        self,
        db: Session,
        obj_in: ProductCreate,
        category_ids: List[int],
    ) -> Product:
        product = self.create(db, obj_in=obj_in)
        self.link_products_to_category(db, product_id=product.id, category_ids=category_ids)
        return product

    def link_products_to_category(
        self, db: Session, *, product_id: int, category_ids: List[int]
    ) -> Optional[Product]:
        product = self.get(db, id=product_id)
        for category_id in category_ids:
            link = ProductCategoryLink(product_id=product_id, category_id=category_id)
            db.add(link)
        db.commit()
        return product

    def unlink_products_from_category(
        self, db: Session, *, product_id: int, category_ids: List[int]
    ) -> Optional[Product]:
        product = self.get(db, id=product_id)
        for category_id in category_ids:
            db.query(ProductCategoryLink).filter(
                ProductCategoryLink.product_id == product_id,
                ProductCategoryLink.category_id == category_id,
            ).delete()
        db.commit()
        return product

    def replace_links_to_category(
        self, db: Session, *, product_id: int, new_category_ids: List[int]
    ) -> Optional[Product]:
        product = self.get(db, id=product_id)
        db.query(ProductCategoryLink).filter(
            ProductCategoryLink.product_id == product_id
        ).delete()
        for category_id in new_category_ids:
            link = ProductCategoryLink(product_id=product_id, category_id=category_id)
            db.add(link)
        db.commit()
        return product


product = CRUDProduct(Product)
