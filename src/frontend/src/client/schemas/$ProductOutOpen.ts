/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProductOutOpen = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
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
        price: {
            type: 'number',
            isRequired: true,
        },
        quantity: {
            type: 'number',
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
    },
} as const;
