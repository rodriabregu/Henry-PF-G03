import { info } from '../../Data/index';
import { Dispatch } from 'redux';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts(dispatch: Dispatch<any>) {
  return dispatch({
    type: GET_PRODUCTS,
    payload: info,
  });
}
