import logging
import os
import sys
from typing import Any, Dict, List, Optional, Union

import aiofiles
from fastapi import APIRouter, Depends, Form, HTTPException, status, UploadFile, File
from sqlmodel import select, func, asc, desc

# from app import crud
from app.api.deps import (
    SessionDep,
    checker,
    get_current_active_superuser,
    get_current_active_superuser_no_error,
    get_current_user_no_error,
)
from app.core.config import settings
from app.crud.crud_product import product as crud_product
from app.models.product import (
    Product,
    ProductCreate,
    ProductOut,
    ProductOutOpen,
    ProductUpdate,
    ProductsOut,
)
from app.models.user import User

router = APIRouter()

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
stream_handler = logging.StreamHandler(sys.stdout)
log_formatter = logging.Formatter("%(asctime)s [%(processName)s: %(process)d] [%(threadName)s: %(thread)d] [%(levelname)s] %(name)s: %(message)s")
stream_handler.setFormatter(log_formatter)
logger.addHandler(stream_handler)

@router.get(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=ProductsOut,
)
def read_products(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve products.
    """
    total_count_statement = select(func.count()).select_from(Product)
    total_count = session.exec(total_count_statement).one()

    products_statement = select(Product).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            products_statement = products_statement.where(getattr(Product, key) == value)

    if sort_field:
        if sort_order.lower() == "desc":
            products_statement = products_statement.order_by(desc(sort_field))
        else:
            products_statement = products_statement.order_by(asc(sort_field))

    products = session.exec(products_statement).all()

    return {
        "products": products,
        "count": total_count,
    }


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
async def create_product(
    *,
    session: SessionDep,
    product_in: ProductCreate = Depends(checker),
    category_ids: List[int] = Form(...),
    image_files: List[UploadFile] = File(...),
) -> Any:
    """
    Create new product.
    """
    product = crud_product.get_by_sku(db=session, sku=product_in.sku)
    if product:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A product with this sku already exists in the system.",
        )

    product_image_dir = os.path.join(settings.IMAGE_UPLOAD_DIR, product_in.sku)
    os.makedirs(product_image_dir, exist_ok=True)

    for image in image_files:
        image_location = os.path.join(product_image_dir, image.filename)
        async with aiofiles.open(image_location, "wb") as f:
            content = await image.read()
            await f.write(content)

    product = crud_product.create_with_categories(
        db=session,
        obj_in=product_in,
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
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_product(
    session: SessionDep,
    product_id: int,
) -> None:
    """
    Delete a product
    """
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(product)
    session.commit()
    return None
