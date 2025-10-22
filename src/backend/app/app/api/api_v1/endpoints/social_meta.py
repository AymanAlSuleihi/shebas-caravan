from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import HTMLResponse
# from sqlmodel import Session
import os
import re
import json
from typing import Optional

from app.api.deps import get_db, SessionDep
from app.core.config import settings
from app.crud.crud_product import product as crud_product
# from app.crud.crud_epigraph import epigraph as epigraph_crud

router = APIRouter()

def is_social_media_bot(user_agent: str) -> bool:
    """Check if the request is from a social media crawler/bot"""
    if not user_agent:
        return False

    social_bots = [
        "facebookexternalhit",
        "Twitterbot",
        "LinkedInBot",
        "WhatsApp",
        "TelegramBot",
        "Slackbot",
        "SkypeUriPreview",
        "discordbot",
        "Applebot",
        "Googlebot",
        "bingbot"
    ]

    user_agent_lower = user_agent.lower()
    return any(bot.lower() in user_agent_lower for bot in social_bots)

def load_index_html() -> str:
    """Load the base index.html file"""
    possible_paths = [
        os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "frontend", "index.html"),
        os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "..", "frontend", "index.html"),
        os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "frontend", "dist", "index.html"),
        "/app/../frontend/index.html",
        "./frontend/index.html"
    ]

    for frontend_path in possible_paths:
        try:
            if os.path.exists(frontend_path):
                with open(frontend_path, "r", encoding="utf-8") as f:
                    return f.read()
        except Exception as e:
            continue

    return """
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sheba's Caravan</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
    """

def generate_product_meta_tags(product) -> str:
    base_url = settings.SERVER_HOST if getattr(settings, "SERVER_HOST", None) else ""

    title = f"{product.name}"
    title = f"{title} | {product.name_musnad}" if getattr(product, "name_musnad", None) else title
    title = f"{title} - Sheba's Caravan"

    description_source = getattr(product, "description", "")
    clean_description = re.sub(r"\s+", " ", description_source).strip()
    if len(clean_description) > 200:
        clean_description = clean_description[:197] + "..."

    # Default image
    image_url = f"{base_url.rstrip('/')}/favicon.png" if base_url else "/favicon.png"
    image_width = "1200"
    image_height = "1200"
    image_type = "image/png"

    # If product has images, pick the first valid one
    if getattr(product, "images", None):
        for img in product.images:
            if not img:
                continue
            if isinstance(img, str) and img.lower().startswith("http"):
                image_url = img
            else:
                img_path = img if img.startswith("/") else f"/{img}"
                # image_url = f"{base_url.rstrip('/')}{img_path}" if base_url else img_path
                # /public/products/${product?.sku}/${image}
                image_url = f"{base_url.rstrip('/')}/public/products/{product.sku}/{img}" if base_url else f"/public/products/{product.sku}/{img}"

            if image_url.lower().endswith((".jpg", ".jpeg")):
                image_type = "image/jpeg"
            else:
                image_type = "image/png"

            break

    # Use singular /product path to match frontend code
    url_key = getattr(product, "url_key", "")
    page_url = f"{base_url.rstrip('/')}/treasure/{url_key}" if base_url else f"/treasure/{url_key}"

    # Build images list for JSON-LD
    images_list = []
    if getattr(product, "images", None):
        for img in product.images:
            if not img:
                continue
            if isinstance(img, str) and img.lower().startswith("http"):
                images_list.append(img)
            else:
                img_path = img if img.startswith("/") else f"/{img}"
                images_list.append(f"{base_url.rstrip('/')}{img_path}" if base_url else img_path)

    json_ld = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": getattr(product, "name", "Sheba's Caravan"),
        "description": clean_description,
        "sku": getattr(product, "sku", ""),
        "image": images_list,
        "brand": {"@type": "Brand", "name": "Sheba's Caravan"},
        "offers": {
            "@type": "Offer",
            "url": page_url,
            "priceCurrency": "GBP",
            "price": float(getattr(product, "price", 0) or 0),
            "availability": "https://schema.org/InStock" if getattr(product, "quantity", 0) > 0 else "https://schema.org/OutOfStock",
            "seller": {"@type": "Organization", "name": "Sheba's Caravan"}
        },
        "category": "Jewellery"
    }

    json_ld_script = f"<script type=\"application/ld+json\">{json.dumps(json_ld, ensure_ascii=False, separators=(',', ':'))}</script>"

    meta_html = f'''
    <title>{title}</title>
    <meta name="description" content="{clean_description}" />
    <link rel="canonical" href="{page_url}" />

    <!-- Open Graph -->
    <meta property="og:type" content="product" />
    <meta property="og:url" content="{page_url}" />
    <meta property="og:title" content="{title}" />
    <meta property="og:description" content="{clean_description}" />
    <meta property="og:image" content="{image_url}" />
    <meta property="og:image:width" content="{image_width}" />
    <meta property="og:image:height" content="{image_height}" />
    <meta property="og:image:type" content="{image_type}" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{title}" />
    <meta name="twitter:description" content="{clean_description}" />
    <meta name="twitter:image" content="{image_url}" />
    '''

    return json_ld_script + "\n" + meta_html

# def generate_epigraph_meta_tags(epigraph) -> str:
#     """Generate meta tags for an epigraph"""
#     base_url = settings.SERVER_HOST
#     title = f"{epigraph.title} - Hudhud" if epigraph.title else f"Epigraph {epigraph.dasi_id} - Hudhud"

#     description = ""
#     if epigraph.epigraph_text:
#         clean_text = re.sub(r"<[^>]*>", " ", epigraph.epigraph_text)
#         clean_text = re.sub(r"\s+", " ", clean_text).strip()
#         description = clean_text[:147] + "..." if len(clean_text) > 150 else clean_text

#     if epigraph.translations:
#         first_translation = epigraph.translations[0].get("text") if epigraph.translations[0].get("text") else ""
#         clean_text = re.sub(r"\s+", " ", first_translation)
#         description = f"{description[:72]}... {clean_text[:72] + '...' if len(clean_text) > 75 else clean_text}"

#     context_parts = []
#     if epigraph.language_level_3:
#         context_parts.append(epigraph.language_level_3)
#     elif epigraph.language_level_2:
#         context_parts.append(epigraph.language_level_2)
#     elif epigraph.language_level_1:
#         context_parts.append(epigraph.language_level_1)
#     if epigraph.period:
#         context_parts.append(epigraph.period)
#     if epigraph.sites_objs and len(epigraph.sites_objs) > 0 and epigraph.sites_objs[0].modern_name:
#         context_parts.append(f"from {epigraph.sites_objs[0].modern_name}")

#     context = f" ({', '.join(context_parts)})" if context_parts else ""

#     if not description:
#         description = f"Inscription {epigraph.dasi_id}{context}. Explore this epigraph with AI-powered search, interactive maps, and comprehensive analysis."
#     else:
#         description = f"{description}{context}"

#     image_url = f"{base_url}hudhud_logo_white.png"
#     image_width = "719"
#     image_height = "413"
#     image_type = "image/png"

#     if hasattr(epigraph, "images") and epigraph.images:
#         for img in epigraph.images:
#             if img.get("copyright_free"):
#                 image_url = f"{base_url}public/images/rec_{img.get('image_id')}_high.jpg"
#                 image_width = "1200"
#                 image_height = "800"
#                 image_type = "image/jpeg"
#                 if img.get("is_main"):
#                     break

#     page_url = f"{base_url}epigraphs/{epigraph.dasi_id}"

#     return f'''
#     <title>{title}</title>
#     <meta name="description" content="{description}" />
#     <link rel="canonical" href="{page_url}" />

#     <!-- Open Graph -->
#     <meta property="og:type" content="article" />
#     <meta property="og:url" content="{page_url}" />
#     <meta property="og:title" content="{title}" />
#     <meta property="og:description" content="{description}" />
#     <meta property="og:image" content="{image_url}" />
#     <meta property="og:image:width" content="{image_width}" />
#     <meta property="og:image:height" content="{image_height}" />
#     <meta property="og:image:type" content="{image_type}" />

#     <!-- Twitter -->
#     <meta name="twitter:card" content="summary_large_image" />
#     <meta name="twitter:title" content="{title}" />
#     <meta name="twitter:description" content="{description}" />
#     <meta name="twitter:image" content="{image_url}" />
#     '''

# @router.get("/epigraphs/{dasi_id}", response_class=HTMLResponse)
# async def get_epigraph_page(
#     dasi_id: int,
#     request: Request,
#     session: SessionDep
# ):
#     """Serve epigraph page with proper meta tags for social media crawlers"""

#     user_agent = request.headers.get("user-agent", "")
#     print(f"Request for epigraph {dasi_id} from user-agent: {user_agent}")

#     if not is_social_media_bot(user_agent):
#         html = load_index_html()
#         return HTMLResponse(content=html)


@router.get("/products/{url_key}", response_class=HTMLResponse)
async def get_product_page(
    url_key: str,
    request: Request,
    session: SessionDep,
):
    """Serve product page with proper meta tags for social media crawlers"""

    user_agent = request.headers.get("user-agent", "")

    # If not a social bot, return the SPA entrypoint
    if not is_social_media_bot(user_agent):
        html = load_index_html()
        return HTMLResponse(content=html)

    try:
        product = crud_product.get_by_url_key(db=session, url_key=url_key)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        html = load_index_html()
        meta_tags = generate_product_meta_tags(product)

        # Remove existing <title> and inject meta tags into <head>
        html = re.sub(r"<title>.*?</title>", "", html, flags=re.DOTALL)
        html = html.replace("<head>", f"<head>{meta_tags}")

        return HTMLResponse(content=html)

    except Exception:
        # On any error, fall back to serving the SPA shell
        html = load_index_html()
        return HTMLResponse(content=html)


@router.get("/treasure/{url_key}", response_class=HTMLResponse)
async def get_treasure_page(
    url_key: str,
    request: Request,
    # session: Session = Depends(get_db),
    session: SessionDep,
):
    """Primary route matching frontend /treasure/{url_key} path."""
    return await get_product_page(url_key=url_key, request=request, session=session)


@router.get("/product/{url_key}", response_class=HTMLResponse)
async def get_product_page_alias(
    url_key: str,
    request: Request,
    session: SessionDep,
):
    """Legacy alias route for backward compatibility."""
    return await get_product_page(url_key=url_key, request=request, session=session)

#     try:
#         epigraph = epigraph_crud.get_by_dasi_id(db=session, dasi_id=dasi_id)
#         if not epigraph:
#             print(f"Epigraph {dasi_id} not found")
#             raise HTTPException(status_code=404, detail="Epigraph not found")

#         print(f"Found epigraph: {epigraph.title or epigraph.dasi_id}")
#         html = load_index_html()
#         meta_tags = generate_epigraph_meta_tags(epigraph)

#         html = re.sub(r"<title>.*?</title>", "", html)
#         html = html.replace("<head>", f"<head>{meta_tags}")

#         print("Generated HTML with meta tags")
#         return HTMLResponse(content=html)

#     except Exception as e:
#         print(f"Error generating meta tags: {e}")
#         html = load_index_html()
#         return HTMLResponse(content=html)
