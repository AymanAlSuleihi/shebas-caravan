/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_carts_create_cart } from '../models/Body_carts_create_cart';
import type { CartOut } from '../models/CartOut';
import type { CartOutOpen } from '../models/CartOutOpen';
import type { CartUpdate } from '../models/CartUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartsService {
    /**
     * Read Carts
     * Retrieve carts.
     * @returns CartOut Successful Response
     * @throws ApiError
     */
    public static cartsReadCarts({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<Array<CartOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/carts/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Cart
     * Create new cart.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static cartsCreateCart({
        customerId,
        requestBody,
    }: {
        customerId: number,
        requestBody: Body_carts_create_cart,
    }): CancelablePromise<(CartOut | CartOutOpen)> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/carts/',
            query: {
                'customer_id': customerId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Cart By Id
     * Get a specific cart by id.
     * @returns CartOut Successful Response
     * @throws ApiError
     */
    public static cartsReadCartById({
        cartId,
    }: {
        cartId: number,
    }): CancelablePromise<CartOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/carts/{cart_id}',
            path: {
                'cart_id': cartId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Cart
     * Update a cart.
     * @returns CartOut Successful Response
     * @throws ApiError
     */
    public static cartsUpdateCart({
        cartId,
        requestBody,
    }: {
        cartId: number,
        requestBody: CartUpdate,
    }): CancelablePromise<CartOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/carts/{cart_id}',
            path: {
                'cart_id': cartId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Cart
     * Delete a cart.
     * @returns CartOut Successful Response
     * @throws ApiError
     */
    public static cartsDeleteCart({
        cartId,
    }: {
        cartId: number,
    }): CancelablePromise<CartOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/carts/{cart_id}',
            path: {
                'cart_id': cartId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Link Products To Cart
     * @returns CartOut Successful Response
     * @throws ApiError
     */
    public static cartsLinkProductsToCart({
        cartId,
        requestBody,
    }: {
        cartId: number,
        requestBody: Array<number>,
    }): CancelablePromise<CartOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/carts/{cart_id}/link-products',
            path: {
                'cart_id': cartId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
