from typing import Any, Dict, List, Optional, Union

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select, func, desc, asc

from app.api.deps import (
    SessionDep,
    get_current_active_superuser,
    get_current_active_superuser_no_error,
)
from app.crud.crud_category import category as crud_category
from app.models.category import (
    Category,
    CategoryCreate,
    CategoryOut,
    CategoryOutOpen,
    CategoryUpdate,
    CategoriesOut,
)

router = APIRouter()


@router.get(
    "/",
    response_model=CategoriesOut,
)
def read_categories(
    session: SessionDep,
    skip: int = 0,
    limit: int = 100,
    sort_field: Optional[str] = None,
    sort_order: Optional[str] = None,
    filters: Optional[Dict[str, Any]] = None,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Retrieve categories.
    """
    total_count_statement = select(func.count()).select_from(Category)
    total_count = session.exec(total_count_statement).one()

    categories_statement = select(Category).offset(skip).limit(limit)

    if filters:
        for key, value in filters.items():
            categories_statement = categories_statement.where(getattr(Category, key) == value)

    if sort_field:
        if sort_order.lower() == "desc":
            categories_statement = categories_statement.order_by(desc(sort_field))
        else:
            categories_statement = categories_statement.order_by(asc(sort_field))

    categories = session.exec(categories_statement).all()

    return {
        "categories": categories,
        "count": total_count,
    }


@router.get(
    "/{category_id}",
    response_model=Union[CategoryOut, CategoryOutOpen],
)
def read_category_by_id(
    category_id: int,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific category by id.
    """
    category = session.get(Category, category_id)
    if current_user:
        category_out = CategoryOut.from_orm(category)
    else:
        category_out = CategoryOutOpen.from_orm(category)
    return category_out


@router.get(
    "/name/{category_name}",
    response_model=Union[CategoryOut, CategoryOutOpen],
)
def read_category_by_name(
    category_name: str,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific category by name.
    """
    category = crud_category.get_by_name(db=session, name=category_name)
    if current_user:
        category_out = CategoryOut.from_orm(category)
    else:
        category_out = CategoryOutOpen.from_orm(category)
    return category_out


@router.get(
    "/url-key/{url_key}",
    response_model=Union[CategoryOut, CategoryOutOpen],
)
def read_category_by_url_key(
    url_key: str,
    session: SessionDep,
    current_user = Depends(get_current_active_superuser_no_error),
) -> Any:
    """
    Get a specific category by url key.
    """
    category = crud_category.get_by_url_key(db=session, url_key=url_key)
    if current_user:
        category_out = CategoryOut.from_orm(category)
    else:
        category_out = CategoryOutOpen.from_orm(category)
    return category_out


@router.post(
    "/",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CategoryOut,
)
def create_category(*, session: SessionDep, category_in: CategoryCreate) -> Any:
    """
    Create new category.
    """
    category = crud_category.get_by_name(db=session, name=category_in.name)
    if category:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A category with this name already exists in the system.",
        )

    category = crud_category.create(db=session, obj_in=category_in)
    return category


@router.put(
    "/{category_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CategoryOut,
)
def update_category(
    *,
    session: SessionDep,
    category_id: int,
    category_in: CategoryUpdate,
) -> Any:
    """
    Update a category
    """
    category = session.get(Category, category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The category does not exist in the system",
        )
    category = crud_category.update(session, db_obj=category, obj_in=category_in)
    return category


@router.delete(
    "/{category_id}",
    dependencies=[Depends(get_current_active_superuser)],
    response_model=CategoryOut,
)
def delete_category(
    session: SessionDep,
    category_id: int,
) -> Any:
    """
    Delete a category
    """
    category = crud_category.remove(session, id=category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The category does not exist in the system",
        )
    return category
