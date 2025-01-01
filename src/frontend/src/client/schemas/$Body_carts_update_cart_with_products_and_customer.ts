/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_carts_update_cart_with_products_and_customer = {
    properties: {
        cart_in: {
            type: 'CartUpdate',
            isRequired: true,
        },
        product_quantities: {
            type: 'dictionary',
            contains: {
                type: 'number',
            },
            isRequired: true,
        },
    },
} as const;
