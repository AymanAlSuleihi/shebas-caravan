from decimal import ROUND_HALF_UP, Decimal
import json
from typing import Any, Dict, List, Optional, Union
from babel import numbers

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func, asc, desc

from app.api.deps import (
    SessionDep,
    checker,
    get_current_active_superuser,
    get_current_active_superuser_no_error,
    get_current_user_no_error,
)
from app.crud.crud_currency import currency as crud_currency
from app.models.currency import (
    Currency,
    CurrencyCreate,
    CurrencyOut,
    # CurrencyOutOpen,
    CurrencyUpdate,
    CurrenciesOut,
)


router = APIRouter()


@router.get(
    "/",
    response_model=CurrenciesOut,
)
def read_currencies(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[str] = None,
) -> Any:
    """
    Retrieve currencies.
    """
    total_count_statement = select(func.count()).select_from(Currency)
    total_count = session.exec(total_count_statement).one()

    currencies_statement = select(Currency).offset(skip).limit(limit)

    if filters:
        filter_dict = json.loads(filters)
        for key, value in filter_dict.items():
            if isinstance(value, bool):
                currencies_statement = currencies_statement.where(
                    getattr(Currency, key).is_(value)
                )
            else:
                currencies_statement = currencies_statement.where(
                    getattr(Currency, key) == value
                )

    if sort_field:
        if sort_order.lower() == "desc":
            currencies_statement = currencies_statement.order_by(desc(sort_field))
        else:
            currencies_statement = currencies_statement.order_by(asc(sort_field))

    currencies = session.exec(currencies_statement).all()

    return {
        "currencies": currencies,
        "count": total_count,
    }


@router.get(
    "/{currency_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CurrencyOut,
)
def read_currency(
    currency_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific currency by id.
    """
    currency = session.get(Currency, currency_id)
    if not currency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Currency not found",
        )
    return currency


@router.get(
    "/{base_code}/{target_code}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CurrencyOut,
)
def read_currency_by_base_target(
    base_code: str,
    target_code: str,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific currency by base and target code.
    """
    currency = crud_currency.get_by_base_target(
        db=session, base_code=base_code, target_code=target_code)
    if not currency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Currency not found",
        )
    return currency


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CurrencyOut,
)
def create_currency(
    *,
    session: SessionDep,
    currency_in: CurrencyCreate,
) -> Any:
    """
    Create new currency.
    """
    currency = session.get(Currency, name=currency_in.name)
    if currency:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A currency with this name already exists in the system.",
        )
    currency = crud_currency.create(db=session, obj_in=currency_in)
    return currency


@router.put(
    "/{currency_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CurrencyOut,
)
def update_currency(
    *,
    session: SessionDep,
    currency_id: int,
    currency_in: CurrencyUpdate,
) -> Any:
    """
    Update a currency.
    """
    currency = session.get(Currency, currency_id)
    if not currency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Currency not found."
        )
    currency = crud_currency.update(session, db_obj=currency, obj_in=currency_in)
    return currency


@router.delete(
    "/{currency_id}",
    dependencies=[Depends(get_current_active_superuser)],
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_currency(
    session: SessionDep,
    currency_id: int
) -> None:
    """
    Delete a currency.
    """
    currency = session.get(Currency, currency_id)
    if not currency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Currency not found"
        )
    session.delete(currency)
    session.commit()
    return None

# TODO: move to services
@router.post(
    "/add-symbols",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=List[CurrencyOut],
)
def add_currency_symbols(
    *,
    session: SessionDep,
) -> Any:
    """
    Add currency symbols.
    """
    currencies = session.exec(select(Currency)).all()
    for currency in currencies:
        currency.symbol = numbers.get_currency_symbol(currency.target_code)
        session.add(currency)
    session.commit()
    return currencies


@router.get(
    "/convert/{amount}/{base_code}/{target_code}",
    response_model=float,
)
def convert_currency(
    *,
    session: SessionDep,
    amount: float,
    base_code: str,
    target_code: str,
) -> Any:
    """
    Convert currency.
    """
    db_currency = crud_currency.get_by_base_target(
        db=session,
        base_code=base_code.upper(),
        target_code=target_code.upper(),
    )
    if not db_currency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Currency not found.",
        )
    rate_decimal = Decimal(str(db_currency.rate))
    converted = Decimal(str(amount)) * rate_decimal
    return float(converted.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))
