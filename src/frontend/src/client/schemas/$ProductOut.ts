/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProductOut = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        url_key: {
            type: 'string',
            isRequired: true,
        },
        type: {
            type: 'string',
            isRequired: true,
        },
        sku: {
            type: 'string',
            isRequired: true,
        },
        cost: {
            type: 'number',
            isRequired: true,
        },
        price: {
            type: 'number',
            isRequired: true,
        },
        quantity: {
            type: 'number',
            isRequired: true,
        },
        preorder: {
            type: 'boolean',
            isRequired: true,
        },
        images: {
            type: 'array',
            contains: {
                type: 'string',
            },
        },
        short_description: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        material: {
            type: 'string',
            isRequired: true,
        },
        weight: {
            type: 'number',
            isRequired: true,
        },
        size: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        categories: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        cart_links: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        order_links: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        orders: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
