/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShippingCountriesOut = {
    properties: {
        shipping_countries: {
            type: 'array',
            contains: {
                type: 'ShippingCountryOut',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
