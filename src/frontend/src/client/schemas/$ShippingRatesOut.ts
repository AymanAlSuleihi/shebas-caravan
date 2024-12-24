/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShippingRatesOut = {
    properties: {
        shipping_rates: {
            type: 'array',
            contains: {
                type: 'ShippingRateOut',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
