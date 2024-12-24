/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShippingZoneOut = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        countries: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
        rates: {
            type: 'array',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
