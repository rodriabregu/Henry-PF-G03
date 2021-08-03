// import axios from 'axios';
import { info } from '../../Data/index';

export const GET_PRODUCTS = 'GET_PRODUCT';

export function getProducts() {
  return function (dispatch: any) {
    return dispatch({
      type: GET_PRODUCTS,
      payload: info,
    });
  };
}
