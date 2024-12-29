/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CartOut = {
    properties: {
        unique_id: {
            type: 'string',
            isRequired: true,
            format: 'uuid',
        },
        amount: {
            type: 'number',
            isRequired: true,
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
        status: {
            type: 'number',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        product_links: {
            type: 'array',
            contains: {
                type: 'ProductCartLink',
            },
        },
        products: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
