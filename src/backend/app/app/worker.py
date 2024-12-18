from pathlib import Path
from typing import List
from fastapi import BackgroundTasks
from PIL import Image


def test_celery(word: str) -> str:
    return f"test task return {word}"


def create_thumbnails(image_paths: List[str]) -> None:
    for image_path in image_paths:
        original_path = Path(image_path)
        thumbnail_dir = original_path.parent / "thumbnails"
        thumbnail_dir.mkdir(parents=True, exist_ok=True)
        with Image.open(image_path) as img:
            max_size = (300, 300)
            img.thumbnail(max_size)
            img_format = img.format if img.format else "jpg"
            thumbnail_path = thumbnail_dir / f"{original_path.stem}_thumbnail{original_path.suffix}"
            img.save(thumbnail_path, format=img_format, optimize=True, quality=85)