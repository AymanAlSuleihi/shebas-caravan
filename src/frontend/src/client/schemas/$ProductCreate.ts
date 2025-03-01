/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProductCreate = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        name_musnad: {
            type: 'string',
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
        },
        size: {
            type: 'string',
        },
        package_dimensions: {
            type: 'array',
            contains: {
                type: 'number',
            },
        },
        featured: {
            type: 'boolean',
        },
    },
} as const;
