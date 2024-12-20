/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CategoriesOut = {
    properties: {
        categories: {
            type: 'array',
            contains: {
                type: 'any-of',
                contains: [{
                    type: 'CategoryOut',
                }, {
                    type: 'CategoryOutOpen',
                }],
            },
        },
        count: {
            type: 'number',
            isRequired: true,
        },
    },
} as const;
