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
    }): CancelablePromise<Record<string, Record<string, any>>> {
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
     * @returns string Successful Response
     * @throws ApiError
     */
    public static paymentsCreatePayment({
        countryId,
        shippingRateId,
        cartId,
        requestBody,
        currency = 'GBP',
    }: {
        countryId: number,
        shippingRateId: number,
        cartId: string,
        requestBody: Array<Record<string, number>>,
        currency?: string,
    }): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/create-payment-intent',
            query: {
                'country_id': countryId,
                'shipping_rate_id': shippingRateId,
                'cart_id': cartId,
                'currency': currency,
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
     * @returns string Successful Response
     * @throws ApiError
     */
    public static paymentsWebhookReceived(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/payments/webhook',
        });
    }
}
