import axios from 'axios';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts() {
  return async (dispatch:any) => {
    const res:any = await axios.get('http://localhost:3001/products')
    console.log('productos ',res.data.data)
    dispatch({ type: GET_PRODUCTS, payload: res.data.data })
  };
};