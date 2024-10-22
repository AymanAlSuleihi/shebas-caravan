from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.order import Order, OrderCreate, OrderUpdate
from app.models.product import Product
from app.models.generic import ProductOrderLink


class CRUDOrder(CRUDBase[Order, OrderCreate, OrderUpdate]):
    def get_by_payment_id(self, db: Session, *, payment_id: str) -> Optional[Order]:
        return db.query(Order).filter(Order.payment.contains({"id": payment_id})).first()

    def create_with_products_by_customer(
        self,
        db: Session,
        *,
        obj_in: OrderCreate,
        # products: List[Product],
        product_quantities: Dict[int, int],
        customer_id: int,
    ) -> Order:
        order = self.create(db, obj_in=obj_in, customer_id=customer_id)
        self.link_products_to_order(
            db,
            order_id=order.id,
            # products=products,
            product_quantities=product_quantities,
        )
        return order

    def update_with_products_and_customer(
        self,
        db: Session,
        *,
        order_id: int,
        obj_in: OrderUpdate,
        # products: List[Product],
        product_quantities: Dict[int, int],
        customer_id: int = None,
    ) -> Order:
        kwargs = {} if customer_id is None else {"customer_id": customer_id}
        order = self.update(db, db_obj=self.get(db, order_id), obj_in=obj_in, **kwargs)
        self.link_products_to_order(
            db,
            order_id=order.id,
            # products=products,
            product_quantities=product_quantities,
        )
        return order

    def link_products_to_order(
        self, db: Session, *, order_id: int, product_quantities: Dict[int, int],
    ) -> Optional[Order]:
        product_links = []
        for product_id, quantity in product_quantities.items():
            link = ProductOrderLink(
                order_id=order_id,
                product_id=product_id,
                order_quantity=quantity,
            )
            product_links.append(link)
        db.add_all(product_links)
        db.commit()
        return order

order = CRUDOrder(Order)
