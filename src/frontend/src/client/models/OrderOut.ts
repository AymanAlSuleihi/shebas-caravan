/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
export type OrderOut = {
    amount: number;
    ordered_product_data?: Array<Record<string, (string | number)>>;
    shipping_rate_data?: Record<string, any>;
    shipping_address?: Record<string, any>;
    payment?: Record<string, any>;
    payment_breakdown?: Record<string, any>;
    refunds?: Array<Record<string, any>>;
    status: number;
    notes?: string;
    id: number;
    product_links?: Array<any>;
    products?: Array<any>;
    created_at?: string;
    updated_at?: string;
    customer?: Customer;
    logs?: Array<any>;
    shipments?: Array<any>;
};

