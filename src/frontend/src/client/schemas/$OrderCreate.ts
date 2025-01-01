/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrderCreate = {
    properties: {
        amount: {
            type: 'number',
            isRequired: true,
        },
        ordered_product_data: {
            type: 'array',
            contains: {
                type: 'dictionary',
                contains: {
                    type: 'any-of',
                    contains: [{
                        type: 'string',
                    }, {
                        type: 'number',
                    }, {
                        type: 'number',
                    }],
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
        shipping_address: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        payment: {
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
        refunds: {
            type: 'array',
            contains: {
                type: 'dictionary',
                contains: {
                    properties: {
                    },
                },
            },
        },
        status: {
            type: 'number',
            isRequired: true,
        },
        notes: {
            type: 'string',
        },
    },
} as const;
