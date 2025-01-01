/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type OrderUpdate = {
    amount?: number;
    ordered_product_data?: Array<Record<string, (string | number)>>;
    shipping_rate_data?: Record<string, any>;
    shipping_address?: Record<string, any>;
    payment?: Record<string, any>;
    payment_breakdown?: Record<string, any>;
    refunds?: Array<Record<string, any>>;
    status?: number;
    notes?: string;
};

