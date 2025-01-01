# import logging
# import sys
from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.staticfiles import StaticFiles
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from sqlmodel import Session

from app.api.api_v1.api import api_router
from app.core.config import settings
from app.tasks import sendgrid_health_check_email
from app.services.currency import import_exchange_rates, import_stripe_supported_currencies
from app.db.engine import engine


# logger = logging.getLogger(__name__)
# logger.setLevel(logging.DEBUG)
# stream_handler = logging.StreamHandler(sys.stdout)
# log_formatter = logging.Formatter("%(asctime)s [%(processName)s: %(process)d] [%(threadName)s: %(thread)d] [%(levelname)s] %(name)s: %(message)s")
# stream_handler.setFormatter(log_formatter)
# logger.addHandler(stream_handler)



def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"

middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["POST", "PUT", "DELETE"],
        allow_headers=["*"],
    )
]

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    generate_unique_id_function=custom_generate_unique_id,
    middleware=middleware,
)

# @app.middleware("http")
# async def cors_handler(request: Request, call_next):
#     response: Response = await call_next(request)
#     origin = request.headers.get("origin")
#     if origin in ["http://localhost"]:
#         response.headers['Access-Control-Allow-Origin'] = origin
#         response.headers['Access-Control-Allow-Credentials'] = 'true'
#         response.headers['Access-Control-Allow-Methods'] = '*'
#         response.headers['Access-Control-Allow-Headers'] = '*'
#     return response

# Set all CORS enabled origins
# if settings.BACKEND_CORS_ORIGINS:
#     app.add_middleware(
#         CORSMiddleware,
#         allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
#         allow_credentials=True,
#         allow_methods=["*"],
#         allow_headers=["*"],
#     )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[str(origin) for origin in ["*"]],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

@app.on_event("startup")
def startup_event():
    scheduler = BackgroundScheduler()
    scheduler.add_job(
        sendgrid_health_check_email,
        "cron",
        day_of_week="sat",
        hour=12,
        minute=00,
        id="sendgrid_health_check_email",
    )

    scheduler.add_job(
        import_exchange_rates,
        "cron",
        hour=00,
        minute=00,
        id="import_exchange_rates",
        args=(Session(engine),),
    )

    scheduler.add_job(
        import_stripe_supported_currencies,
        "cron",
        day_of_week="sat",
        hour=00,
        minute=00,
        id="import_stripe_supported_currencies",
        args=(Session(engine),),
    )

    scheduler.start()

@app.get("/api/v1/", tags=["read_root"])
def read_root():
    return {"Hello": "World"}

@app.get("/api/v1/add", tags=["add"])
def add(x: float, y: float, z: float):
    return x + y + z

app.include_router(api_router, prefix=settings.API_V1_STR)
app.mount("/public", StaticFiles(directory="public"), name="public")
