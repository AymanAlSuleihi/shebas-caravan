/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_media_upload_images = {
    properties: {
        sku: {
            type: 'string',
        },
        category_name: {
            type: 'string',
        },
        image_files: {
            type: 'array',
            contains: {
                type: 'binary',
                format: 'binary',
            },
            isRequired: true,
        },
    },
} as const;
