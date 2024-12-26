/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShippingRateOutOpen = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        weight_max: {
            type: 'number',
            isRequired: true,
        },
        package_size_name: {
            type: 'string',
            isRequired: true,
        },
        service_name: {
            type: 'string',
            isRequired: true,
        },
        package_size_dimensions: {
            type: 'array',
            contains: {
                type: 'number',
            },
        },
        delivery_time: {
            type: 'string',
            isRequired: true,
        },
        insurance: {
            type: 'number',
            isRequired: true,
        },
        price: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
