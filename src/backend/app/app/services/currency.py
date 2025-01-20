import os
import requests
from datetime import datetime

import stripe

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

stripe.api_key = settings.STRIPE_SEC_KEY


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


def import_stripe_supported_currencies(db):
    try:
        supported_currencies = stripe.CountrySpec.retrieve("GB")["supported_payment_currencies"]

        zero_decimal_currencies = [
            "BIF",
            "CLP",
            "DJF",
            "GNF",
            "JPY",
            "KMF",
            "KRW",
            "MGA",
            "PYG",
            "RWF",
            "UGX",
            "VND",
            "VUV",
            "XAF",
            "XOF",
            "XPF",
        ]

        no_fraction_currencies = [
            "ISK",
            "UGX",
        ]

        for supported_currency in supported_currencies:
            currency = crud_currency.get_by_base_target(
                db=db,
                base_code="GBP",
                target_code=supported_currency.upper()
            )
            if currency:
                crud_currency.update(
                    db=db,
                    db_obj=currency,
                    obj_in=CurrencyUpdate(
                        stripe_supported=True,
                        stripe_zero_decimal=supported_currency.upper() in zero_decimal_currencies,
                        stripe_no_fraction=supported_currency.upper() in no_fraction_currencies,
                    ),
                )

    except Exception as e:
        return False
