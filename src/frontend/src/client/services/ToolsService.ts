/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ToolsService {
    /**
     * Sheet Weight
     * @returns number Successful Response
     * @throws ApiError
     */
    public static toolsSheetWeight({
        alloy,
        dimX,
        dimY,
        dimZ,
    }: {
        alloy: string,
        dimX: number,
        dimY: number,
        dimZ: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/sheet/weight',
            query: {
                'alloy': alloy,
                'dim_x': dimX,
                'dim_y': dimY,
                'dim_z': dimZ,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wire Weight
     * @returns number Successful Response
     * @throws ApiError
     */
    public static toolsWireWeight({
        alloy,
        radius,
        length,
    }: {
        alloy: string,
        radius: number,
        length: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/wire/weight',
            query: {
                'alloy': alloy,
                'radius': radius,
                'length': length,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wire Radius
     * @returns number Successful Response
     * @throws ApiError
     */
    public static toolsWireRadius({
        alloy,
        length,
        weight,
    }: {
        alloy: string,
        length: number,
        weight: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/wire/radius',
            query: {
                'alloy': alloy,
                'length': length,
                'weight': weight,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wire Length
     * @returns number Successful Response
     * @throws ApiError
     */
    public static toolsWireLength({
        alloy,
        radius,
        weight,
    }: {
        alloy: string,
        radius: number,
        weight: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/wire/length',
            query: {
                'alloy': alloy,
                'radius': radius,
                'weight': weight,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Granule Weight
     * @returns number Successful Response
     * @throws ApiError
     */
    public static toolsGranuleWeight({
        alloy,
        radius,
    }: {
        alloy: string,
        radius: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/granule/weight',
            query: {
                'alloy': alloy,
                'radius': radius,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Granule Radius
     * @returns number Successful Response
     * @throws ApiError
     */
    public static toolsGranuleRadius({
        alloy,
        weight,
    }: {
        alloy: string,
        weight: number,
    }): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/granule/radius',
            query: {
                'alloy': alloy,
                'weight': weight,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wire To Granule Rod Radius
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsWireToGranuleRodRadius({
        wireRadius,
        granuleRadius,
    }: {
        wireRadius: number,
        granuleRadius: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/granule/from-wire/rod-radius',
            query: {
                'wire_radius': wireRadius,
                'granule_radius': granuleRadius,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wire To Granule Wire Radius
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsWireToGranuleWireRadius({
        rodRadius,
        granuleRadius,
    }: {
        rodRadius: number,
        granuleRadius: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/granule/from-wire/wire-radius',
            query: {
                'rod_radius': rodRadius,
                'granule_radius': granuleRadius,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Wire To Granule Granule Radius
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsWireToGranuleGranuleRadius({
        wireRadius,
        rodRadius,
    }: {
        wireRadius: number,
        rodRadius: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/granule/from-wire/granule-radius',
            query: {
                'wire_radius': wireRadius,
                'rod_radius': rodRadius,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ring Blank
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsRingBlank({
        ringSize,
        sizeFormat,
        ringWidth,
        sheetThickness,
    }: {
        ringSize: (number | string),
        sizeFormat: string,
        ringWidth: number,
        sheetThickness: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/ring-blank',
            query: {
                'ring_size': ringSize,
                'size_format': sizeFormat,
                'ring_width': ringWidth,
                'sheet_thickness': sheetThickness,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ring Size Converter
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsRingSizeConverter({
        sizeFormatFrom,
        sizeFormatTo,
        ringSize,
    }: {
        sizeFormatFrom: string,
        sizeFormatTo: string,
        ringSize: (number | string),
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/ring-size-converter',
            query: {
                'size_format_from': sizeFormatFrom,
                'size_format_to': sizeFormatTo,
                'ring_size': ringSize,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Ring Size Formats
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsRingSizeFormats(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/ring-size-formats',
        });
    }
    /**
     * Ring Size Options
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsRingSizeOptions({
        locale,
    }: {
        locale: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/ring-sizes',
            query: {
                'locale': locale,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Metals
     * @returns any Successful Response
     * @throws ApiError
     */
    public static toolsMetals(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/tools/metals',
        });
    }
}
