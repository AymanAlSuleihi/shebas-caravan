/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CurrencyUpdate = {
    properties: {
        base_code: {
            type: 'string',
        },
        target_code: {
            type: 'string',
        },
        timestamp: {
            type: 'string',
            format: 'date-time',
        },
        rate: {
            type: 'number',
        },
        symbol: {
            type: 'string',
        },
        stripe_supported: {
            type: 'boolean',
        },
        stripe_zero_decimal: {
            type: 'boolean',
        },
        stripe_no_fraction: {
            type: 'boolean',
        },
    },
} as const;
