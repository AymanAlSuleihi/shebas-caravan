/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShippingZonesOut = {
    properties: {
        shipping_zones: {
            type: 'array',
            contains: {
                type: 'ShippingZoneOut',
            },
            isRequired: true,
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
