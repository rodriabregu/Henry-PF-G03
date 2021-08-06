import axios from 'axios';
export const GET_PRODUCTS = 'GET_PRODUCTS';

export function getProducts() {
  return async (dispatch:any) => {
    const res:any = await axios.get('http://localhost:3001/products')
    dispatch({ type: GET_PRODUCTS, payload: res.data.data })
  }
}

/*   return async function(dispatch: ({}:any) => void) {
  const res:any = await axios.get('http://localhost:3001/products')
  dispatch({ type: GET_PRODUCTS, payload: res.data.data })
} */

/* export function getProducts(dispatch: Dispatch<any>) {
  return dispatch({
    type: GET_PRODUCTS,
    payload: info,
  });
} */