/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CartCreate = {
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
    },
} as const;
