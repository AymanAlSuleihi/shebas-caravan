/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerCreate } from '../models/CustomerCreate';
import type { CustomerOut } from '../models/CustomerOut';
import type { CustomerUpdate } from '../models/CustomerUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
    /**
     * Read Customers
     * Retrieve customers.
     * @returns CustomerOut Successful Response
     * @throws ApiError
     */
    public static customersReadCustomers({
        skip,
        limit = 100,
    }: {
        skip?: number,
        limit?: number,
    }): CancelablePromise<Array<CustomerOut>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/',
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
     * Create Customer
     * Create new customer.
     * @returns CustomerOut Successful Response
     * @throws ApiError
     */
    public static customersCreateCustomer({
        requestBody,
    }: {
        requestBody: CustomerCreate,
    }): CancelablePromise<CustomerOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/customers/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Customer By Id
     * Get a specific customer by id.
     * @returns CustomerOut Successful Response
     * @throws ApiError
     */
    public static customersReadCustomerById({
        customerId,
    }: {
        customerId: number,
    }): CancelablePromise<CustomerOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/{customer_id}',
            path: {
                'customer_id': customerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Customer
     * Update a customer
     * @returns CustomerOut Successful Response
     * @throws ApiError
     */
    public static customersUpdateCustomer({
        customerId,
        requestBody,
    }: {
        customerId: number,
        requestBody: CustomerUpdate,
    }): CancelablePromise<CustomerOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/customers/{customer_id}',
            path: {
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
     * Delete Customer
     * Delete a customer
     * @returns CustomerOut Successful Response
     * @throws ApiError
     */
    public static customersDeleteCustomer({
        customerId,
    }: {
        customerId: number,
    }): CancelablePromise<CustomerOut> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/customers/{customer_id}',
            path: {
                'customer_id': customerId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Customer Id By Email
     * Get a specific customer id by email.
     * @returns number Successful Response
     * @throws ApiError
     */
    public static customersReadCustomerIdByEmail({
        customerEmail,
    }: {
        customerEmail: string,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/email/{customer_email}',
            path: {
                'customer_email': customerEmail,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
