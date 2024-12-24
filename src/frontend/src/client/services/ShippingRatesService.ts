/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingRateCreate } from '../models/ShippingRateCreate';
import type { ShippingRateOut } from '../models/ShippingRateOut';
import type { ShippingRatesOut } from '../models/ShippingRatesOut';
import type { ShippingRateUpdate } from '../models/ShippingRateUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShippingRatesService {
    /**
     * Read Shipping Rates
     * Retrieve shipping rates.
     * @returns ShippingRatesOut Successful Response
     * @throws ApiError
     */
    public static shippingRatesReadShippingRates({
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
    }): CancelablePromise<ShippingRatesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipping_rates/',
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
     * Create Shipping Rate
     * Create new shipping rate.
     * @returns ShippingRateOut Successful Response
     * @throws ApiError
     */
    public static shippingRatesCreateShippingRate({
        requestBody,
    }: {
        requestBody: ShippingRateCreate,
    }): CancelablePromise<ShippingRateOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_rates/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Shipping Rate
     * Get a specific shipping rate by id.
     * @returns ShippingRateOut Successful Response
     * @throws ApiError
     */
    public static shippingRatesReadShippingRate({
        shippingRateId,
    }: {
        shippingRateId: number,
    }): CancelablePromise<ShippingRateOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipping_rates/{shipping_rate_id}',
            path: {
                'shipping_rate_id': shippingRateId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Shipping Rate
     * Update a shipping rate.
     * @returns ShippingRateOut Successful Response
     * @throws ApiError
     */
    public static shippingRatesUpdateShippingRate({
        shippingRateId,
        requestBody,
    }: {
        shippingRateId: number,
        requestBody: ShippingRateUpdate,
    }): CancelablePromise<ShippingRateOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/shipping_rates/{shipping_rate_id}',
            path: {
                'shipping_rate_id': shippingRateId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Shipping Rate
     * Delete a shipping rate.
     * @returns void
     * @throws ApiError
     */
    public static shippingRatesDeleteShippingRate({
        shippingRateId,
    }: {
        shippingRateId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/shipping_rates/{shipping_rate_id}',
            path: {
                'shipping_rate_id': shippingRateId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Many Shipping Rates
     * Create multiple shipping rates.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static shippingRatesCreateManyShippingRates(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_rates/test/create_many',
        });
    }
}
