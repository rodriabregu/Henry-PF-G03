import axios from 'axios';
import config from '../../../../src/config';

export const GET_PRODUCTS = 'GET_PRODUCTS';


export function getProducts() {
  return async (dispatch:any) => {
    const res:any = await axios.get(`http://${config.REACT_APP_API_URL}:3001/products`)
    dispatch({ type: GET_PRODUCTS, payload: res.data.data })
  };
};