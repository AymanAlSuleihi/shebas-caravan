/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShippingRateUpdate = {
    properties: {
        weight_max: {
            type: 'number',
        },
        package_size_name: {
            type: 'string',
        },
        service_name: {
            type: 'string',
        },
        package_size_dimensions: {
            type: 'array',
            contains: {
                type: 'number',
            },
        },
        delivery_time: {
            type: 'string',
        },
        insurance: {
            type: 'number',
        },
        price: {
            type: 'number',
        },
        cost: {
            type: 'number',
        },
    },
} as const;
