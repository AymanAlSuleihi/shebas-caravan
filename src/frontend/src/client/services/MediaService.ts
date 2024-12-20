/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_media_upload_images } from '../models/Body_media_upload_images';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MediaService {
    /**
     * Upload Images
     * Upload images.
     * @returns string Successful Response
     * @throws ApiError
     */
    public static mediaUploadImages({
        formData,
    }: {
        formData: Body_media_upload_images,
    }): CancelablePromise<Record<string, Array<string>>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/media/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Generate Thumbnails For All Products
     * Generate thumbnails for all products.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static mediaGenerateThumbnailsForAllProducts(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/media/generate-product-thumbnails',
        });
    }
    /**
     * Generate Thumbnails For All Categories
     * Generate thumbnails for all categories.
     * @returns any Successful Response
     * @throws ApiError
     */
    public static mediaGenerateThumbnailsForAllCategories(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/media/generate-category-thumbnails',
        });
    }
}
