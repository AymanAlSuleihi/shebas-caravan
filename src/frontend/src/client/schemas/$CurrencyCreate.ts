/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CurrencyCreate = {
    properties: {
        base_code: {
            type: 'string',
            isRequired: true,
        },
        target_code: {
            type: 'string',
            isRequired: true,
        },
        timestamp: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        rate: {
            type: 'number',
            isRequired: true,
        },
        symbol: {
            type: 'string',
            isRequired: true,
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
