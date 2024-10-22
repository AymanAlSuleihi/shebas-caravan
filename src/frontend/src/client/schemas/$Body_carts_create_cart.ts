/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_carts_create_cart = {
    properties: {
        cart_in: {
            type: 'CartCreate',
            isRequired: true,
        },
        product_quantities: {
            type: 'dictionary',
            contains: {
                type: 'number',
            },
        },
    },
} as const;
