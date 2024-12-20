/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $OrderOut = {
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
        status: {
            type: 'number',
            isRequired: true,
        },
        notes: {
            type: 'string',
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        product_links: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        products: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        created_at: {
            type: 'string',
            format: 'date-time',
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
        },
        customer: {
            type: 'Customer',
        },
        shipments: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
