import logging
import sys
import requests
from datetime import datetime

from app.core.config import settings
from app.crud.crud_currency import currency as crud_currency
from app.models.currency import (
    Currency,
    CurrencyCreate,
    CurrencyOut,
    # CurrencyOutOpen,
    CurrencyUpdate,
    CurrenciesOut,
)


API_KEY = settings.EXCHANGE_RATE_API_KEY
BASE_URL = settings.EXCHANGE_RATE_BASE_URL

def import_exchange_rates(db):
    response = requests.get(f"{BASE_URL}/{API_KEY}/latest/GBP")
    data = response.json()

    if response.status_code == 200:
        rates = data["conversion_rates"]
        timestamp = datetime.strptime(
            data["time_last_update_utc"],
            "%a, %d %b %Y %H:%M:%S %z",
        )

        for code, rate in rates.items():
            currency = crud_currency.get_by_base_target(db=db, base_code="GBP", target_code=code)
            if currency:
                if timestamp != currency.timestamp:
                    crud_currency.update(
                        db=db,
                        db_obj=currency,
                        obj_in=CurrencyUpdate(
                            rate=rate,
                            timestamp=timestamp,
                        ),
                    )
            else:
                crud_currency.create(
                    db=db,
                    obj_in=CurrencyCreate(
                        base_code="GBP",
                        target_code=code,
                        rate=rate,
                        timestamp=timestamp,
                    ),
                )

        return True
