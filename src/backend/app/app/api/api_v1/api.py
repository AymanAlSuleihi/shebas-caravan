from fastapi import APIRouter

from app.api.api_v1.endpoints import (
    carts,
    categories,
    currency,
    customers,
    login,
    media,
    orders,
    payments,
    products,
    shipments,
    shipping_country,
    shipping_rate,
    shipping_zone,
    tools,
    users,
    utils,
)

api_router = APIRouter()
api_router.include_router(carts.router, prefix="/carts", tags=["carts"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(currency.router, prefix="/currency", tags=["currency"])
api_router.include_router(customers.router, prefix="/customers", tags=["customers"])
api_router.include_router(login.router, tags=["login"])
api_router.include_router(media.router, prefix="/media", tags=["media"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(shipments.router, prefix="/shipments", tags=["shipments"])
api_router.include_router(shipping_country.router, prefix="/shipping_countries", tags=["shipping_countries"])
api_router.include_router(shipping_rate.router, prefix="/shipping_rates", tags=["shipping_rates"])
api_router.include_router(shipping_zone.router, prefix="/shipping_zones", tags=["shipping_zones"])
api_router.include_router(tools.router, prefix="/tools", tags=["tools"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
