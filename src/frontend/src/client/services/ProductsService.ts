/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_products_create_product } from '../models/Body_products_create_product';
import type { ProductOut } from '../models/ProductOut';
import type { ProductOutOpen } from '../models/ProductOutOpen';
import type { ProductsOut } from '../models/ProductsOut';
import type { ProductsOutOpen } from '../models/ProductsOutOpen';
import type { ProductUpdate } from '../models/ProductUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Read Products
     * Retrieve products.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static productsReadProducts({
        skip,
        limit = 100,
        sortField,
        sortOrder,
        filters,
    }: {
        skip?: number,
        limit?: number,
        sortField?: string,
        sortOrder?: string,
        filters?: string,
    }): CancelablePromise<(ProductsOut | ProductsOutOpen)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/',
            query: {
                'skip': skip,
                'limit': limit,
                'sort_field': sortField,
                'sort_order': sortOrder,
                'filters': filters,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Product
     * Create new product.
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static productsCreateProduct({
        requestBody,
    }: {
        requestBody: Body_products_create_product,
    }): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/products/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Product By Id
     * Get a specific product by id.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static productsReadProductById({
        productId,
    }: {
        productId: number,
    }): CancelablePromise<(ProductOut | ProductOutOpen)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Product
     * Update a product
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static productsUpdateProduct({
        productId,
        requestBody,
    }: {
        productId: number,
        requestBody: ProductUpdate,
    }): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/products/{product_id}',
            path: {
                'product_id': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Product
     * Delete a product
     * @returns void
     * @throws ApiError
     */
    public static productsDeleteProduct({
        productId,
    }: {
        productId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/products/{product_id}',
            path: {
                'product_id': productId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Products By Category
     * Retrieve products by category.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static productsReadProductsByCategory({
        categoryId,
    }: {
        categoryId: number,
    }): CancelablePromise<Array<(ProductOut | ProductOutOpen)>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/category/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Product By Url Key
     * Get a specific product by url key.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static productsReadProductByUrlKey({
        urlKey,
    }: {
        urlKey: string,
    }): CancelablePromise<(ProductOut | ProductOutOpen)> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/products/url-key/{url_key}',
            path: {
                'url_key': urlKey,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Replace Product Categories
     * Replace product categories
     * @returns ProductOut Successful Response
     * @throws ApiError
     */
    public static productsReplaceProductCategories({
        productId,
        requestBody,
    }: {
        productId: number,
        requestBody: Array<number>,
    }): CancelablePromise<ProductOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/products/{product_id}/replace-categories',
            path: {
                'product_id': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
