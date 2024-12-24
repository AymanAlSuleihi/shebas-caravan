/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShippingZoneCreate } from '../models/ShippingZoneCreate';
import type { ShippingZoneOut } from '../models/ShippingZoneOut';
import type { ShippingZonesOut } from '../models/ShippingZonesOut';
import type { ShippingZoneUpdate } from '../models/ShippingZoneUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShippingZonesService {
    /**
     * Read Shipping Zones
     * Retrieve shipping zones.
     * @returns ShippingZonesOut Successful Response
     * @throws ApiError
     */
    public static shippingZonesReadShippingZones({
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
    }): CancelablePromise<ShippingZonesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipping_zones/',
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
     * Create Shipping Zone
     * Create new shipping zone.
     * @returns ShippingZoneOut Successful Response
     * @throws ApiError
     */
    public static shippingZonesCreateShippingZone({
        requestBody,
    }: {
        requestBody: ShippingZoneCreate,
    }): CancelablePromise<ShippingZoneOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_zones/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Shipping Zone
     * Get a specific shipping zone by id.
     * @returns ShippingZoneOut Successful Response
     * @throws ApiError
     */
    public static shippingZonesReadShippingZone({
        shippingZoneId,
    }: {
        shippingZoneId: number,
    }): CancelablePromise<ShippingZoneOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipping_zones/{shipping_zone_id}',
            path: {
                'shipping_zone_id': shippingZoneId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Shipping Zone
     * Update a shipping zone.
     * @returns ShippingZoneOut Successful Response
     * @throws ApiError
     */
    public static shippingZonesUpdateShippingZone({
        shippingZoneId,
        requestBody,
    }: {
        shippingZoneId: number,
        requestBody: ShippingZoneUpdate,
    }): CancelablePromise<ShippingZoneOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/shipping_zones/{shipping_zone_id}',
            path: {
                'shipping_zone_id': shippingZoneId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Shipping Zone
     * Delete a shipping zone.
     * @returns void
     * @throws ApiError
     */
    public static shippingZonesDeleteShippingZone({
        shippingZoneId,
    }: {
        shippingZoneId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/shipping_zones/{shipping_zone_id}',
            path: {
                'shipping_zone_id': shippingZoneId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Link Country To Zone
     * Link a country to a shipping zone.
     * @returns ShippingZoneOut Successful Response
     * @throws ApiError
     */
    public static shippingZonesLinkCountryToZone({
        shippingZoneId,
        countryId,
    }: {
        shippingZoneId: number,
        countryId: number,
    }): CancelablePromise<ShippingZoneOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_zones/{shipping_zone_id}/countries/{country_id}',
            path: {
                'shipping_zone_id': shippingZoneId,
                'country_id': countryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Link Rate To Zone
     * Link a rate to a shipping zone.
     * @returns ShippingZoneOut Successful Response
     * @throws ApiError
     */
    public static shippingZonesLinkRateToZone({
        shippingZoneId,
        shippingRateId,
    }: {
        shippingZoneId: number,
        shippingRateId: number,
    }): CancelablePromise<ShippingZoneOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipping_zones/{shipping_zone_id}/rates/{shipping_rate_id}',
            path: {
                'shipping_zone_id': shippingZoneId,
                'shipping_rate_id': shippingRateId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
