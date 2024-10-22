/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_products_create_product = {
    properties: {
        product_in: {
            type: 'ProductCreate',
            isRequired: true,
        },
        category_ids: {
            type: 'array',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
    },
} as const;
