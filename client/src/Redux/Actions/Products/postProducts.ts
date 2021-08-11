import axios from 'axios';
import config from '../../../../src/config';
export const POST_PRODUCTS = 'POST_PRODUCTS';

const postProducts = (dataProduct:any) => {
  return async (dispatch:any) => {
    await axios.post(`http://${config.REACT_APP_API_URL}:3001/products`, dataProduct)
    .then( res => {
      dispatch({
          type: POST_PRODUCTS,
          payload: res
      })
    })
  };
};

export default postProducts;