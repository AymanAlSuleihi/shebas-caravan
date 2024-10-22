/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * Calculate Order Total
     * @returns any Successful Response
     * @throws ApiError
     */
    public static paymentsCalculateOrderTotal({
        requestBody,
    }: {
        requestBody: Array<Record<string, number>>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/calculate-order-total',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Payment
     * @returns any Successful Response
     * @throws ApiError
     */
    public static paymentsCreatePayment({
        cartId,
        requestBody,
    }: {
        cartId: string,
        requestBody: Array<Record<string, number>>,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/create-payment-intent',
            query: {
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
     * Webhook Received
     * @returns any Successful Response
     * @throws ApiError
     */
    public static paymentsWebhookReceived(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/webhook',
        });
    }
}
