import { Dispatch } from 'redux';
export const POST_PRODUCTS = 'POST_PRODUCTS';
import axios, {AxiosResponse} from 'axios';


export function postProducts(dispatch, payload) {
  return dispatch({
      return axios.post({
          url:'http://localhost:3001/products',
      })     
  });
}
