/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductCartLink } from './ProductCartLink';
export type CartOutOpen = {
    unique_id: string;
    amount: number;
    shipping_address?: Record<string, any>;
    payment?: Record<string, any>;
    status: number;
    id: number;
    product_links?: Array<ProductCartLink>;
};

