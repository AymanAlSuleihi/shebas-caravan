/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CategoryOutOpen = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        url_key: {
            type: 'string',
            isRequired: true,
        },
        thumbnail: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        products: {
            type: 'array',
            contains: {
                type: 'ProductOutOpen',
            },
        },
    },
} as const;
