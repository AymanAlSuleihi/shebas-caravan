/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CartUpdate = {
    properties: {
        unique_id: {
            type: 'string',
            format: 'uuid',
        },
        amount: {
            type: 'number',
        },
        shipping_address: {
            type: 'dictionary',
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
        status: {
            type: 'number',
        },
    },
} as const;
