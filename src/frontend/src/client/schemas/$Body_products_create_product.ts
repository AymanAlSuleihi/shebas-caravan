/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_products_create_product = {
    properties: {
        category_ids: {
            type: 'array',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
        image_files: {
            type: 'array',
            contains: {
                type: 'binary',
                format: 'binary',
            },
            isRequired: true,
        },
        data: {
            type: 'string',
            isRequired: true,
        },
    },
} as const;
