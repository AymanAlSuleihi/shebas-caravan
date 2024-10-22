from typing import Any, List, Optional, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select

# from app import crud
from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
    get_current_active_superuser_no_error,
    get_current_user_no_error,
)
from app.crud.crud_product import product as crud_product
from app.models.product import (
    Product,
    ProductCreate,
    ProductOut,
    ProductOutOpen,
    ProductUpdate,
)
from app.models.user import User

router = APIRouter()


@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=List[ProductOut]
)
def read_products(session: SessionDep, skip: int = 0, limit: int = 100) -> Any:
    """
    Retrieve products.
    """
    statement = select(Product).offset(skip).limit(limit)
    products = session.exec(statement).all()
    return products


@router.get(
    "/{product_id}",
    # dependencies=[Depends(get_current_active_superuser)],
    response_model=Union[ProductOut, ProductOutOpen],
)
def read_product_by_id(
    product_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific product by id.
    """
    product = session.get(Product, product_id)
    if current_user:
        product_out = ProductOut.from_orm(product)
    else:
        product_out = ProductOutOpen.from_orm(product)
    return product_out


@router.get(
    "/category/{category_id}",
    response_model=List[Union[ProductOut, ProductOutOpen]],
)
def read_products_by_category(
    category_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Retrieve products by category.
    """
    products = crud_product.get_by_category(db=session, category_id=category_id)
    if current_user:
        products_out = [ProductOut.from_orm(product) for product in products]
    else:
        products_out = [ProductOutOpen.from_orm(product) for product in products]
    return products_out


@router.get(
    "/url-key/{url_key}",
    response_model=Union[ProductOut, ProductOutOpen],
)
def read_product_by_url_key(
    url_key: str,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific product by url key.
    """
    product = crud_product.get_by_url_key(db=session, url_key=url_key)
    if current_user:
        product_out = ProductOut.from_orm(product)
    else:
        product_out = ProductOutOpen.from_orm(product)
    return product_out


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProductOut,
)
def create_product(
    *, session: SessionDep, product_in: ProductCreate, category_ids: List[int]) -> Any:
    """
    Create new product.
    """
    product = crud_product.get_by_sku(db=session, sku=product_in.sku)
    if product:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A product with this sku already exists in the system.",
        )

    # product = crud_product.create(db=session, obj_in=product_in)
    product = crud_product.create_with_categories(
        db=session,
        product=product_in,
        category_ids=category_ids
    )
    return product


@router.put(
    "/{product_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProductOut,
)
def update_product(
    *,
    session: SessionDep,
    product_id: int,
    product_in: ProductUpdate,
) -> Any:
    """
    Update a product
    """
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The product does not exist in the system",
        )
    product = crud_product.update(session, db_obj=product, obj_in=product_in)
    return product


@router.put(
    "/{product_id}/replace-categories",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProductOut,
)
def replace_product_categories(
    *,
    session: SessionDep,
    product_id: int,
    new_category_ids: List[int],
) -> Any:
    """
    Replace product categories
    """
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The product does not exist in the system",
        )
    product = crud_product.replace_links_to_category(
        session,
        product_id=product_id,
        new_category_ids=new_category_ids
    )
    return product


@router.delete(
    "/{product_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProductOut,
)
def delete_product(
    session: SessionDep,
    product_id: int,
) -> Any:
    """
    Delete a product
    """
    product = crud_product.remove(session, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The product does not exist in the system",
        )
    return product
