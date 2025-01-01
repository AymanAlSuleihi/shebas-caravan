/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrenciesOut } from '../models/CurrenciesOut';
import type { CurrencyCreate } from '../models/CurrencyCreate';
import type { CurrencyOut } from '../models/CurrencyOut';
import type { CurrencyUpdate } from '../models/CurrencyUpdate';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CurrencyService {
    /**
     * Read Currencies
     * Retrieve currencies.
     * @returns CurrenciesOut Successful Response
     * @throws ApiError
     */
    public static currencyReadCurrencies({
        skip,
        limit = 100,
        sortField,
        sortOrder,
        filters,
    }: {
        skip?: number,
        limit?: number,
        sortField?: string,
        sortOrder?: string,
        filters?: string,
    }): CancelablePromise<CurrenciesOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/currency/',
            query: {
                'skip': skip,
                'limit': limit,
                'sort_field': sortField,
                'sort_order': sortOrder,
                'filters': filters,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Create Currency
     * Create new currency.
     * @returns CurrencyOut Successful Response
     * @throws ApiError
     */
    public static currencyCreateCurrency({
        requestBody,
    }: {
        requestBody: CurrencyCreate,
    }): CancelablePromise<CurrencyOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/currency/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Currency
     * Get a specific currency by id.
     * @returns CurrencyOut Successful Response
     * @throws ApiError
     */
    public static currencyReadCurrency({
        currencyId,
    }: {
        currencyId: number,
    }): CancelablePromise<CurrencyOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/currency/{currency_id}',
            path: {
                'currency_id': currencyId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Update Currency
     * Update a currency.
     * @returns CurrencyOut Successful Response
     * @throws ApiError
     */
    public static currencyUpdateCurrency({
        currencyId,
        requestBody,
    }: {
        currencyId: number,
        requestBody: CurrencyUpdate,
    }): CancelablePromise<CurrencyOut> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/currency/{currency_id}',
            path: {
                'currency_id': currencyId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Delete Currency
     * Delete a currency.
     * @returns void
     * @throws ApiError
     */
    public static currencyDeleteCurrency({
        currencyId,
    }: {
        currencyId: number,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/currency/{currency_id}',
            path: {
                'currency_id': currencyId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Read Currency By Base Target
     * Get a specific currency by base and target code.
     * @returns CurrencyOut Successful Response
     * @throws ApiError
     */
    public static currencyReadCurrencyByBaseTarget({
        baseCode,
        targetCode,
    }: {
        baseCode: string,
        targetCode: string,
    }): CancelablePromise<CurrencyOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/currency/{base_code}/{target_code}',
            path: {
                'base_code': baseCode,
                'target_code': targetCode,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Add Currency Symbols
     * Add currency symbols.
     * @returns CurrencyOut Successful Response
     * @throws ApiError
     */
    public static currencyAddCurrencySymbols(): CancelablePromise<Array<CurrencyOut>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/currency/add-symbols',
        });
    }
    /**
     * Convert Currency
     * Convert currency.
     * @returns number Successful Response
     * @throws ApiError
     */
    public static currencyConvertCurrency({
        amount,
        baseCode,
        targetCode,
    }: {
        amount: number,
        baseCode: string,
        targetCode: string,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/currency/convert/{amount}/{base_code}/{target_code}',
            path: {
                'amount': amount,
                'base_code': baseCode,
                'target_code': targetCode,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
