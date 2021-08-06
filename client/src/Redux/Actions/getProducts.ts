import axios from 'axios'
import { info } from '../../Data/index';
import { Dispatch } from 'redux';
export const GET_PRODUCTS = 'GET_PRODUCTS';

/*
export function getProducts(dispatch: Dispatch<any>) {
  return dispatch({
    type: GET_PRODUCTS,
    payload: info,
  });
}
*/


export function getProducts() {
  
  return function (dispatch:()=>void ) {
    axios.get('http://localhost:3001/products')
      .then(resp => {
        console.log(resp.data);
        dispatch({ type: GET_PRODUCTS, payload: resp.data })
      })
  }  
}
