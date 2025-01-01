/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrderOutOpen = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        amount: {
            type: 'number',
        },
        ordered_product_data: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        shipping_rate_data: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        payment_breakdown: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
