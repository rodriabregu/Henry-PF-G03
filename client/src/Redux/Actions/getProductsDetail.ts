import { Dispatch } from 'react';
export const GET_PRODUCTS_DETAIL = 'GET_PRODUCTS_DETAIL';

export function getProductsDetail(dispatch: Dispatch<any>, id: number) {
  return dispatch({
    type: GET_PRODUCTS_DETAIL,
    payload: id,
  });
}
