export const ADD_CART_PRODUCTS = 'ADD_CART_PRODUCTS';

export function addActionCart(payload:any) {
    return { type: ADD_CART_PRODUCTS, payload };
};