/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UtilsService {
    /**
     * Generate Id
     * Generate a random uuid.
     * @returns string Successful Response
     * @throws ApiError
     */
    public static utilsGenerateId(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/utils/generate-id',
        });
    }
    /**
     * Test Celery
     * Test Celery worker.
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static utilsTestCelery({
        requestBody,
    }: {
        requestBody: Message,
    }): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-celery/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Contact Form Email
     * Send contact form email.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static utilsContactFormEmail({
        name,
        emailFrom,
        message,
    }: {
        name: string,
        emailFrom: string,
        message: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/contact-form-email',
            query: {
                'name': name,
                'email_from': emailFrom,
                'message': message,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test Email
     * Test emails.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static utilsTestEmail({
        emailTo,
    }: {
        emailTo: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-email/',
            query: {
                'email_to': emailTo,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test New Order Email
     * @returns any Successful Response
     * @throws ApiError
     */
    public static utilsTestNewOrderEmail({
        orderId,
    }: {
        orderId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-email/new-order',
            query: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Test Order Dispatched Email
     * @returns any Successful Response
     * @throws ApiError
     */
    public static utilsTestOrderDispatchedEmail({
        orderId,
    }: {
        orderId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/utils/test-email/order-dispatched',
            query: {
                'order_id': orderId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
