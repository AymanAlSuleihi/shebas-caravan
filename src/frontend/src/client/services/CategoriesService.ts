/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoriesOut } from '../models/CategoriesOut';
import type { CategoryCreate } from '../models/CategoryCreate';
import type { CategoryOut } from '../models/CategoryOut';
import type { CategoryOutOpen } from '../models/CategoryOutOpen';
import type { CategoryUpdate } from '../models/CategoryUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CategoriesService {
    /**
     * Read Categories
     * Retrieve categories.
     * @returns CategoriesOut Successful Response
     * @throws ApiError
     */
    public static categoriesReadCategories({
        skip,
        limit = 100,
        sortField,
        sortOrder,
        requestBody,
    }: {
        skip?: number,
        limit?: number,
        sortField?: string,
        sortOrder?: string,
        requestBody?: Record<string, any>,
    }): CancelablePromise<CategoriesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/',
            query: {
                'skip': skip,
                'limit': limit,
                'sort_field': sortField,
                'sort_order': sortOrder,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Category
     * Create new category.
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static categoriesCreateCategory({
        requestBody,
    }: {
        requestBody: CategoryCreate,
    }): CancelablePromise<CategoryOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/categories/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Category By Id
     * Get a specific category by id.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static categoriesReadCategoryById({
        categoryId,
    }: {
        categoryId: number,
    }): CancelablePromise<(CategoryOut | CategoryOutOpen)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Category
     * Update a category
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static categoriesUpdateCategory({
        categoryId,
        requestBody,
    }: {
        categoryId: number,
        requestBody: CategoryUpdate,
    }): CancelablePromise<CategoryOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/categories/{category_id}',
            path: {
                'category_id': categoryId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Category
     * Delete a category
     * @returns CategoryOut Successful Response
     * @throws ApiError
     */
    public static categoriesDeleteCategory({
        categoryId,
    }: {
        categoryId: number,
    }): CancelablePromise<CategoryOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/categories/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Category By Name
     * Get a specific category by name.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static categoriesReadCategoryByName({
        categoryName,
    }: {
        categoryName: string,
    }): CancelablePromise<(CategoryOut | CategoryOutOpen)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/name/{category_name}',
            path: {
                'category_name': categoryName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Category By Url Key
     * Get a specific category by url key.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static categoriesReadCategoryByUrlKey({
        urlKey,
    }: {
        urlKey: string,
    }): CancelablePromise<(CategoryOut | CategoryOutOpen)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/categories/url-key/{url_key}',
            path: {
                'url_key': urlKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
