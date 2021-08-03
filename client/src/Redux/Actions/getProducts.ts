import { info } from '../../Data/index';

export const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts() {
  console.log(info)
  return {
    type: GET_PRODUCTS,
    payload: info,
  };
}
