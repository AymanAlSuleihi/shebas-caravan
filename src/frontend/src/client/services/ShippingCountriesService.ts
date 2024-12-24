/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingCountriesOut } from '../models/ShippingCountriesOut';
import type { ShippingCountryCreate } from '../models/ShippingCountryCreate';
import type { ShippingCountryOut } from '../models/ShippingCountryOut';
import type { ShippingCountryUpdate } from '../models/ShippingCountryUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShippingCountriesService {
    /**
     * Read Shipping Countries
     * Retrieve shipping countries.
     * @returns ShippingCountriesOut Successful Response
     * @throws ApiError
     */
    public static shippingCountriesReadShippingCountries({
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
    }): CancelablePromise<ShippingCountriesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipping_countries/',
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
     * Create Shipping Country
     * Create new shipping country.
     * @returns ShippingCountryOut Successful Response
     * @throws ApiError
     */
    public static shippingCountriesCreateShippingCountry({
        requestBody,
    }: {
        requestBody: ShippingCountryCreate,
    }): CancelablePromise<ShippingCountryOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_countries/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Shipping Country
     * Get a specific shipping country by id.
     * @returns ShippingCountryOut Successful Response
     * @throws ApiError
     */
    public static shippingCountriesReadShippingCountry({
        shippingCountryId,
    }: {
        shippingCountryId: number,
    }): CancelablePromise<ShippingCountryOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipping_countries/{shipping_country_id}',
            path: {
                'shipping_country_id': shippingCountryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Shipping Country
     * Update a shipping country.
     * @returns ShippingCountryOut Successful Response
     * @throws ApiError
     */
    public static shippingCountriesUpdateShippingCountry({
        shippingCountryId,
        requestBody,
    }: {
        shippingCountryId: number,
        requestBody: ShippingCountryUpdate,
    }): CancelablePromise<ShippingCountryOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/shipping_countries/{shipping_country_id}',
            path: {
                'shipping_country_id': shippingCountryId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Shipping Country
     * Delete a shipping country.
     * @returns void
     * @throws ApiError
     */
    public static shippingCountriesDeleteShippingCountry({
        shippingCountryId,
    }: {
        shippingCountryId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/shipping_countries/{shipping_country_id}',
            path: {
                'shipping_country_id': shippingCountryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Many Shipping Countries
     * Create many shipping countries.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static shippingCountriesCreateManyShippingCountries(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_countries/test/create_countries/many',
        });
    }
}
