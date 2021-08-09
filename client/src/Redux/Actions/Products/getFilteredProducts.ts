export const GET_FILTERED_PRODUCTS = 'GET_FILTERED_PRODUCTS';

export function getFilteredProducts(category:string) {
    return{
        type: GET_FILTERED_PRODUCTS,
        payload:category
    };
};

