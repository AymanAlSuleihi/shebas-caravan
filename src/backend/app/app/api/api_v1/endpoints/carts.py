from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select

# from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
    get_current_active_superuser_no_error,
)
from app.crud.crud_cart import cart as crud_cart
from app.crud.crud_product import product as crud_product
from app.models.cart import (
    Cart,
    CartCreate,
    CartOut,
    CartOutOpen,
    CartUpdate,
)

router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=List[CartOut],
)
def read_carts(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve carts.
    """
    statement = select(Cart).offset(skip).limit(limit)
    carts = session.exec(statement).all()
    return carts


@router.post(
    "/",
    response_model=Union[CartOut, CartOutOpen],
)
def create_cart(
    *,
    session: SessionDep,
    cart_in: CartCreate,
    product_quantities: Dict[int, int] = None,
    customer_id: int,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Create new cart.
    """
    cart = crud_cart.create_with_products_by_customer(
        db=session,
        obj_in=cart_in,
        product_quantities=product_quantities,
        customer_id=customer_id,
    )
    if current_user:
        cart_out = CartOut.from_orm(cart)
    else:
        cart_out = CartOutOpen.from_orm(cart)
    return cart_out


@router.get(
    "/{cart_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CartOut,
)
def read_cart_by_id(
    cart_id: int, session: SessionDep
) -> Any:
    """
    Get a specific cart by id.
    """
    cart = session.get(Cart, cart_id)
    return cart


@router.get(
    "/unique/{unique_id}",
    response_model=Union[CartOut, CartOutOpen],
)
def read_cart_by_unique_id(
    unique_id: str,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific cart by unique id.
    """
    cart = crud_cart.get_by_unique_id(session, unique_id=unique_id)
    if current_user:
        cart_out = CartOut.from_orm(cart)
    else:
        cart_out = CartOutOpen.from_orm(cart)
    return cart_out


@router.put(
    "/{cart_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CartOut,
)
def update_cart(
    *,
    session: SessionDep,
    cart_id: int,
    cart_in: CartUpdate,
) -> Any:
    """
    Update a cart.
    """
    cart = session.get(Cart, cart_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The cart does not exist in the system",
        )
    cart = crud_cart.update(session, db_obj=cart, obj_in=cart_in)
    return cart


@router.put(
    "/{cart_id}/update-with-products-and-customer",
    response_model=Union[CartOut, CartOutOpen],
)
def update_cart_with_products_and_customer(
    *,
    session: SessionDep,
    cart_id: int,
    cart_in: CartUpdate,
    product_quantities: Dict[int, int],
    customer_id: int,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Update a cart with products and customer.
    """
    cart = crud_cart.update_with_products_and_customer(
        db=session,
        cart_id=cart_id,
        obj_in=cart_in,
        product_quantities=product_quantities,
        customer_id=customer_id,
    )
    if current_user:
        cart_out = CartOut.from_orm(cart)
    else:
        cart_out = CartOutOpen.from_orm(cart)
    return cart_out


@router.put(
    "/{cart_id}/link-products",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CartOut,
)
def link_products_to_cart(
    *,
    session: SessionDep,
    cart_id: int,
    product_ids: List[int],
) -> Any:
    cart = crud_cart.link_products_to_cart(session, cart_id, product_ids)
    return cart


@router.delete(
    "/{cart_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CartOut,
)
def delete_cart(
    session: SessionDep,
    cart_id: int,
) -> Any:
    """
    Delete a cart.
    """
    cart = crud_cart.remove(session, cart_id)
    if not cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The cart does not exist in the system",
        )
    return cart
