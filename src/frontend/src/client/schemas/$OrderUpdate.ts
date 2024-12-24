/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrderUpdate = {
    properties: {
        amount: {
            type: 'number',
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
        },
        notes: {
            type: 'string',
        },
    },
} as const;
