/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CustomerOut = {
    properties: {
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
        },
        first_name: {
            type: 'string',
        },
        last_name: {
            type: 'string',
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        carts: {
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
