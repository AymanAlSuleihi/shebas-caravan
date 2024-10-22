/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ShipmentCreate } from '../models/ShipmentCreate';
import type { ShipmentOut } from '../models/ShipmentOut';
import type { ShipmentUpdate } from '../models/ShipmentUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ShipmentsService {
    /**
     * Read Shipments
     * Retrieve shipments.
     * @returns ShipmentOut Successful Response
     * @throws ApiError
     */
    public static shipmentsReadShipments({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<Array<ShipmentOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipments/',
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
     * Create Shipment By Order
     * Create new shipment by order.
     * @returns ShipmentOut Successful Response
     * @throws ApiError
     */
    public static shipmentsCreateShipmentByOrder({
        orderId,
        requestBody,
    }: {
        orderId: number,
        requestBody: ShipmentCreate,
    }): CancelablePromise<ShipmentOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/shipments/',
            query: {
                'order_id': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Shipment By Id
     * Get a specific shipment by id.
     * @returns ShipmentOut Successful Response
     * @throws ApiError
     */
    public static shipmentsReadShipmentById({
        shipmentId,
    }: {
        shipmentId: number,
    }): CancelablePromise<ShipmentOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/shipments/{shipment_id}',
            path: {
                'shipment_id': shipmentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Shipment
     * Update an shipment
     * @returns ShipmentOut Successful Response
     * @throws ApiError
     */
    public static shipmentsUpdateShipment({
        shipmentId,
        requestBody,
    }: {
        shipmentId: number,
        requestBody: ShipmentUpdate,
    }): CancelablePromise<ShipmentOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/shipments/{shipment_id}',
            path: {
                'shipment_id': shipmentId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Shipment
     * Delete an shipment
     * @returns ShipmentOut Successful Response
     * @throws ApiError
     */
    public static shipmentsDeleteShipment({
        shipmentId,
    }: {
        shipmentId: number,
    }): CancelablePromise<ShipmentOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/shipments/{shipment_id}',
            path: {
                'shipment_id': shipmentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
