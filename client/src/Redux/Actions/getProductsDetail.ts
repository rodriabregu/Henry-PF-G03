import { Dispatch } from 'react';
import axios from 'axios';
export const GET_PRODUCTS_DETAIL = 'GET_PRODUCTS_DETAIL';


export function getProductsDetail(id:number) {
  return async (dispatch:any) => {
    const res:any = await axios.get(`http://localhost:3001/product/id/${id}`)
    dispatch({ type: GET_PRODUCTS_DETAIL, payload: res.data })
  }
}
