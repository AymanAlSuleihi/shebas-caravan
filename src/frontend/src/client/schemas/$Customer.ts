/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Customer = {
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
        created_at: {
            type: 'string',
            format: 'date-time',
        },
        updated_at: {
            type: 'string',
            format: 'date-time',
        },
        id: {
            type: 'number',
        },
    },
} as const;
