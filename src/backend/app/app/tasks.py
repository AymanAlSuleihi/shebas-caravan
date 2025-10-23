from pathlib import Path
from typing import List
from PIL import Image

from app.utils import send_contact_form_email, send_email


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
            img.save(thumbnail_path, format=img_format, optimise=True, quality=85)


def compress_images(image_paths: List[str], force: bool = False) -> None:
    """
    Compress images for SEO optimisation.
    """
    for image_path in image_paths:
        original_path = Path(image_path)

        if not original_path.exists():
            continue

        if original_path.suffix.lower() == '.webp':
            continue

        flag_file = original_path.parent / f".{original_path.name}.compressed"
        output_path = original_path.parent / f"{original_path.stem}.webp"

        original_needs_optimisation = not flag_file.exists() or force
        webp_needs_generation = not output_path.exists() or force

        if not original_needs_optimisation and not webp_needs_generation:
            print(f"Skipping {original_path.name}: Already fully processed")
            continue

        try:
            with Image.open(image_path) as img:
                if webp_needs_generation:
                    if original_path.suffix.lower() in ['.jpg', '.jpeg']:
                        img.save(
                            output_path,
                            format="WEBP",
                            quality=90,
                            method=6
                        )
                    elif original_path.suffix.lower() == '.png':
                        has_transparency = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)

                        if has_transparency:
                            img.save(
                                output_path,
                                format="WEBP",
                                lossless=False,
                                quality=95,
                                method=6
                            )
                        else:
                            img.save(
                                output_path,
                                format="WEBP",
                                lossless=False,
                                quality=90,
                                method=6
                            )
                    else:
                        img.save(
                            output_path,
                            format="WEBP",
                            quality=90,
                            method=6
                        )

                if original_needs_optimisation:
                    if original_path.suffix.lower() in ['.jpg', '.jpeg']:
                        img.save(
                            original_path,
                            format="JPEG",
                            optimise=True,
                            quality=90,
                            progressive=True
                        )
                    elif original_path.suffix.lower() == '.png':
                        img.save(
                            original_path,
                            format="PNG",
                            optimise=True,
                            compress_level=9
                        )

                    flag_file.touch()

        except Exception as e:
            continue


def sendgrid_health_check_email() -> None:
    send_contact_form_email(
        name="Sendgrid health check",
        email_from="contact@shebascaravan.com",
        message="Keep alive",
    )
