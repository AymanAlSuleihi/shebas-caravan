/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderCreate } from '../models/OrderCreate';
import type { OrderOut } from '../models/OrderOut';
import type { OrderOutOpen } from '../models/OrderOutOpen';
import type { OrdersOut } from '../models/OrdersOut';
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
     * @returns OrdersOut Successful Response
     * @throws ApiError
     */
    public static ordersReadOrders({
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
    }): CancelablePromise<OrdersOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/',
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
     * Refund Order
     * Refund Order
     * @returns OrderOut Successful Response
     * @throws ApiError
     */
    public static ordersRefundOrder({
        orderId,
        refundAmount,
        cancelOrder = false,
    }: {
        orderId: number,
        refundAmount?: number,
        cancelOrder?: boolean,
    }): CancelablePromise<OrderOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/orders/{order_id}/refund',
            path: {
                'order_id': orderId,
            },
            query: {
                'refund_amount': refundAmount,
                'cancel_order': cancelOrder,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Sales Data
     * Get sales data for period and previous period
     * @returns any Successful Response
     * @throws ApiError
     */
    public static ordersGetSalesData({
        startDate,
        endDate,
        interval = 'day',
    }: {
        startDate: string,
        endDate: string,
        interval?: string,
    }): CancelablePromise<Record<string, Array<Record<string, any>>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/stats/sales-data',
            query: {
                'start_date': startDate,
                'end_date': endDate,
                'interval': interval,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Sales By Category
     * Get sales by category for a given period
     * @returns any Successful Response
     * @throws ApiError
     */
    public static ordersGetSalesByCategory({
        startDate,
        endDate,
    }: {
        startDate: string,
        endDate: string,
    }): CancelablePromise<Array<Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/stats/sales-by-category',
            query: {
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Orders Per Status
     * Get count of orders per status
     * @returns number Successful Response
     * @throws ApiError
     */
    public static ordersGetOrdersPerStatus({
        startDate,
        endDate,
    }: {
        startDate: string,
        endDate: string,
    }): CancelablePromise<Record<string, number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/orders/stats/orders-per-status',
            query: {
                'start_date': startDate,
                'end_date': endDate,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
