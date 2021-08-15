import axios from 'axios';
export const POST_PRODUCTS = 'POST_PRODUCTS';

const postSale = (dataProduct:any) => {
  return async (dispatch:any) => {
    await axios.post(`http://localhost:3001/products`, dataProduct)
    .then( res => {
      dispatch({
          type: POST_PRODUCTS,
          payload: res
      })
    })
  };
};

export default postSale;