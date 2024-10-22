/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ShipmentOut = {
    properties: {
        dispatched_at: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        method: {
            type: 'string',
            isRequired: true,
        },
        tracking_number: {
            type: 'string',
            isRequired: true,
        },
        tracking_link: {
            type: 'string',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
