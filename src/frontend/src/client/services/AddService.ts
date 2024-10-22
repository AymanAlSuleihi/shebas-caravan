/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddService {
    /**
     * Add
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addAdd({
        x,
        y,
        z,
    }: {
        x: number,
        y: number,
        z: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/add',
            query: {
                'x': x,
                'y': y,
                'z': z,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
