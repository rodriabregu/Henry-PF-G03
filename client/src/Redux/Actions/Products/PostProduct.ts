import { Dispatch } from 'react';
import axios from 'axios';
export const POST_PRODUCTS = 'POST_PRODUCTS';


export default function postProduct(dataProduct:any) {
  return async (dispatch:any) => {
    const res:any = await axios.post(`http://localhost:3001/products`, dataProduct)
    .then((res)=>{
      dispatch({
         type: POST_PRODUCTS,
          payload: res
        })
    })
  }
}