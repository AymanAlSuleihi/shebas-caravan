from datetime import datetime
from typing import Dict, List, Optional
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.cart import Cart, CartCreate, CartUpdate
from app.models.product import Product
from app.models.generic import ProductCartLink


class CRUDCart(CRUDBase[Cart, CartCreate, CartUpdate]):
    def get_by_unique_id(self, db: Session, *, unique_id: str) -> Optional[Cart]:
        return db.query(Cart).filter(Cart.unique_id == unique_id).first()

    def create_with_products_by_customer(
        self,
        db: Session,
        *,
        obj_in: CartCreate,
        # products: List[Product],
        product_quantities: Dict[int, int],
        customer_id: int,
    ) -> Cart:
        cart = self.create(db, obj_in=obj_in, customer_id=customer_id)
        self.link_products_to_cart(
            db,
            cart_id=cart.id,
            product_quantities=product_quantities,
        )
        # self.link_products_to_cart(
        #     db,
        #     cart=cart,
        #     products=products,
        #     product_quantities=product_quantities,
        # )
        return cart

    def update_with_products_and_customer(
        self,
        db: Session,
        *,
        cart_id: int,
        obj_in: CartUpdate,
        # products: List[Product],
        product_quantities: Dict[int, int],
        customer_id: int = None,
    ) -> Optional[Cart]:
        kwargs = {} if customer_id is None else {"customer_id": customer_id}
        cart = self.update(db, db_obj=self.get(db, cart_id), obj_in=obj_in, **kwargs)
        self.link_products_to_cart(
            db,
            cart_id=cart.id,
            product_quantities=product_quantities,
        )
        # self.link_products_to_cart(
        #     db,
        #     cart=cart,
        #     products=products,
        #     product_quantities=product_quantities,
        # )
        return cart

    # def link_products_to_cart(
    #     self,
    #     db: Session,
    #     *,
    #     cart: Cart,
    #     products: List[Product],
    #     product_quantities: Dict[int, int],
    # ) -> Optional[Cart]:
    #     product_links = []
    #     for product in products:
    #         link = ProductCartLink(
    #             cart=cart,
    #             product=product,
    #             cart_quantity=product_quantities[product.id],
    #         )
    #         product_links.append(link)
    #     db.add_all(product_links)
    #     db.commit()
    #     return cart

    def link_products_to_cart(
        self, db: Session, *, cart_id: int, product_quantities: Dict[int, int],
    ) -> Optional[Cart]:
        cart = self.get(db, id=cart_id)
        product_links = []
        for product_id, quantity in product_quantities.items():
            link = ProductCartLink(
                cart_id=cart_id,
                product_id=product_id,
                cart_quantity=quantity,
            )
            product_links.append(link)
        db.add_all(product_links)
        db.commit()
        return cart

    def unlink_products_from_cart(
        self, db: Session, *, cart_id: int, product_ids: List[int],
    ) -> Optional[Cart]:
        cart = self.get(db, id=cart_id)
        # for product_id in product_ids:
        #     product_link = next((link for link in cart.product_links if link.product_id == product_id), None)
        #     if product_link:
        #         cart.product_links.remove(product_link)
        links = (
            db.query(ProductCartLink)
            .filter(ProductCartLink.cart_id == cart_id)
            .filter(ProductCartLink.product_id.in_(product_ids))
            .all()
        )
        for link in links:
            db.delete(link)
        db.commit()
        return cart

cart = CRUDCart(Cart)
