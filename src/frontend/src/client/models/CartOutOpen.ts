/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCartLink } from './ProductCartLink';
import type { ProductOutOpen } from './ProductOutOpen';
export type CartOutOpen = {
    unique_id: string;
    amount: number;
    shipping_address?: Record<string, any>;
    shipping_rate_data?: Record<string, any>;
    payment?: Record<string, any>;
    status: number;
    id: number;
    product_links?: Array<ProductCartLink>;
    products?: Array<ProductOutOpen>;
};

