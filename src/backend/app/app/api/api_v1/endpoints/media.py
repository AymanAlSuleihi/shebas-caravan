import os
from typing import Any, Dict, List, Optional
from uuid import UUID, uuid4

import aiofiles
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, BackgroundTasks, status
from sqlmodel import select

from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.core.celery_app import celery_app
from app.core.config import settings
from app.tasks import compress_images, create_thumbnails
from app.models.product import Product
from app.models.category import Category

router = APIRouter()

@router.post(
    "/upload",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, List[str]],
)
async def upload_images(
    *,
    session: SessionDep,
    sku: Optional[str] = Form(None),
    category_name: Optional[str] = Form(None),
    image_files: List[UploadFile] = File(),
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Upload images.
    """
    if sku:
        image_dir = os.path.join(f"{settings.IMAGE_UPLOAD_DIR}", sku)
    elif category_name:
        image_dir = os.path.join(f"{settings.CATEGORY_IMAGE_UPLOAD_DIR}", category_name)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Either sku or category_name must be provided.")

    os.makedirs(image_dir, exist_ok=True)

    image_names = []
    for image_file in image_files:
        image_location = os.path.join(image_dir, image_file.filename)
        async with aiofiles.open(image_location, "wb") as f:
            content = await image_file.read()
            await f.write(content)
        image_names.append(image_file.filename)

    image_paths = [os.path.join(image_dir, name) for name in image_names]

    background_tasks.add_task(compress_images, image_paths)
    background_tasks.add_task(create_thumbnails, image_paths)

    return {
        "filenames": image_names,
        "urls": [f"{settings.SERVER_HOST}/{image_dir}/{name}" for name in image_names],
    }


@router.post(
    "/generate-product-thumbnails",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, Any],
)
async def generate_thumbnails_for_all_products(
    *,
    session: SessionDep,
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Generate thumbnails for all products.
    """
    products = session.exec(select(Product)).all()
    image_paths = []

    for product in products:
        for image in product.images:
            image_path = os.path.join(f"{settings.IMAGE_UPLOAD_DIR}", product.sku, image)
            image_paths.append(image_path)

    background_tasks.add_task(create_thumbnails, image_paths)

    return {"message": "Thumbnail generation task has been initiated."}


@router.post(
    "/generate-category-thumbnails",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, Any],
)
async def generate_thumbnails_for_all_categories(
    *,
    session: SessionDep,
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Generate thumbnails for all categories.
    """
    categories = session.exec(select(Category)).all()
    image_paths = []

    for category in categories:
        for image in category.images:
            image_path = os.path.join(f"{settings.CATEGORY_IMAGE_UPLOAD_DIR}", category.name, image)
            image_paths.append(image_path)

    background_tasks.add_task(create_thumbnails, image_paths)

    return {"message": "Thumbnail generation task for categories has been initiated."}


@router.post(
    "/compress-product-images",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, Any],
)
async def compress_all_product_images(
    *,
    session: SessionDep,
    background_tasks: BackgroundTasks,
    force: bool = False,
) -> Any:
    """
    Compress all product images for SEO optimisation.
    """
    products = session.exec(select(Product)).all()
    image_paths = []

    for product in products:
        for image in product.images:
            image_path = os.path.join(f"{settings.IMAGE_UPLOAD_DIR}", product.sku, image)
            image_paths.append(image_path)

    background_tasks.add_task(compress_images, image_paths, force)

    return {"message": f"Image compression task has been initiated for all products (force={force})."}


@router.post(
    "/compress-category-images",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, Any],
)
async def compress_all_category_images(
    *,
    session: SessionDep,
    background_tasks: BackgroundTasks,
    force: bool = False,
) -> Any:
    """
    Compress all category images for SEO optimisation.
    Creates WebP versions and optimises original files.
    Skips images that already have WebP versions unless force=True.
    """
    categories = session.exec(select(Category)).all()
    image_paths = []

    for category in categories:
        for image in category.images:
            image_path = os.path.join(f"{settings.CATEGORY_IMAGE_UPLOAD_DIR}", category.name, image)
            image_paths.append(image_path)

    background_tasks.add_task(compress_images, image_paths, force)

    return {"message": f"Image compression task has been initiated for all categories (force={force})."}
