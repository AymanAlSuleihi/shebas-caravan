import os
from typing import Any, Dict, List, Optional
from uuid import UUID, uuid4

import aiofiles
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, BackgroundTasks
from sqlmodel import select

from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
)
from app.core.celery_app import celery_app
from app.core.config import settings
from app.worker import create_thumbnails
from app.models.product import Product

router = APIRouter()

@router.post(
    "/upload",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=Dict[str, List[str]],
)
async def upload_images(
    *,
    session: SessionDep,
    # uuid: Optional[UUID] = Form(None),
    sku: str = Form(),
    image_files: List[UploadFile] = File(),
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Upload images.
    """
    image_dir = os.path.join(f"{settings.IMAGE_UPLOAD_DIR}", sku)
    os.makedirs(image_dir, exist_ok=True)

    image_names = []
    for image_file in image_files:
        image_location = os.path.join(image_dir, image_file.filename)
        async with aiofiles.open(image_location, "wb") as f:
            content = await image_file.read()
            await f.write(content)
        image_names.append(image_file.filename)

    image_paths = [os.path.join(image_dir, name) for name in image_names]

    background_tasks.add_task(create_thumbnails, image_paths)

    return {
        "filenames": image_names,
        "urls": [f"{settings.SERVER_HOST}/{image_dir}/{name}" for name in image_names],
    }


@router.post(
    "/generate-thumbnails",
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
