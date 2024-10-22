/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrderCreate = {
    amount: number;
    ordered_product_data?: Array<Record<string, (string | number)>>;
    shipping_address?: Record<string, any>;
    payment?: Record<string, any>;
    status: number;
};

