// import axios from "axios"
import { Dispatch } from 'react';

export const GET_PRODUCTS_DETAIL = 'GET_PRODUCT_DETAIL';

export function getProductDetail(id:number) {
  return function (dispatch:Dispatch<any>) {
    return dispatch({
      type: GET_PRODUCTS_DETAIL,
      payload: id
    });
  };
}
