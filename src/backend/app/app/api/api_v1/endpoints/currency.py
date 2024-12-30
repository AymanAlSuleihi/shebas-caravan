from typing import Any, Dict, List, Optional, Union

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
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CurrenciesOut,
)
def read_currencies(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
) -> Any:
    """
    Retrieve currencies.
    """
    total_count_statement = select(func.count()).select_from(Currency)
    total_count = session.exec(total_count_statement).one()

    currencies_statement = select(Currency).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
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


# get by base target
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
