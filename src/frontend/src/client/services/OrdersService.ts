/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderCreate } from '../models/OrderCreate';
import type { OrderOut } from '../models/OrderOut';
import type { OrderOutOpen } from '../models/OrderOutOpen';
import type { OrderUpdate } from '../models/OrderUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Order Status
     * @returns any Successful Response
     * @throws ApiError
     */
    public static ordersOrderStatus(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/order-status',
        });
    }
    /**
     * Read Orders
     * Retrieve orders.
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersReadOrders({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<Array<OrderOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/',
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
     * Create Order
     * Create new order.
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersCreateOrder({
        requestBody,
    }: {
        requestBody: OrderCreate,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/orders/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Order By Id
     * Get a specific order by id.
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersReadOrderById({
        orderId,
    }: {
        orderId: number,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Order
     * Update an order
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersUpdateOrder({
        orderId,
        requestBody,
    }: {
        orderId: number,
        requestBody: OrderUpdate,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}',
            path: {
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
     * Delete Order
     * Delete an order
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersDeleteOrder({
        orderId,
    }: {
        orderId: number,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/orders/{order_id}',
            path: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Order By Payment Id
     * Get a specific order by payment id.
     * @returns OrderOutOpen Successful Response
     * @throws ApiError
     */
    public static ordersReadOrderByPaymentId({
        paymentId,
    }: {
        paymentId: string,
    }): CancelablePromise<OrderOutOpen> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/payment-id/{payment_id}',
            path: {
                'payment_id': paymentId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Products To Order
     * Add products to an order
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersAddProductsToOrder({
        orderId,
        requestBody,
    }: {
        orderId: number,
        requestBody: Array<number>,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/add-products',
            path: {
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
     * Dispatch Order
     * Dispatch Order
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersDispatchOrder({
        orderId,
        requestBody,
    }: {
        orderId: number,
        requestBody: Array<number>,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/dispatch',
            path: {
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
     * Cancel Order
     * Cancel Order
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersCancelOrder({
        orderId,
        refundAmount,
    }: {
        orderId: number,
        refundAmount?: number,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/cancel',
            path: {
                'order_id': orderId,
            },
            query: {
                'refund_amount': refundAmount,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
