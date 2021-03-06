import axios from 'axios';
import config from '../../../../src/config';

export const GET_PRODUCTS_DETAIL = 'GET_PRODUCTS_DETAIL';

export function getProductsDetail(productId: number) {
  return async (dispatch: any) => {
    const res: any = await axios.get(
      `http://${config.REACT_APP_API_URL}:3001/api/product/${productId}`
    )
    dispatch({
      type: GET_PRODUCTS_DETAIL,
      payload: res.data.product
    })
  };
};