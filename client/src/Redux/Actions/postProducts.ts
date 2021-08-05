import { Dispatch } from 'redux';
import axios from 'axios';
export const POST_PRODUCTS = 'POST_PRODUCTS';


export function postProducts(payload:any) {
  return function(dispatch:any):any{
        axios.post('http://localhost:3001/products', payload)
            .then((resp:any)=>{
                dispatch({
                    type:POST_PRODUCTS,
                    payload:resp.data
                })
            })
    }
}
