import axios from 'axios';
import config from '../../../../src/config';
export const POST_PRODUCTS = 'POST_PRODUCTS';

const postSale = (dataProduct: any) => {
  return function (dispatch: any) {
    axios.post(`http://${config.REACT_APP_API_URL}:${config.port}/api/product`, dataProduct)
      .then(res => {
        console.log('despachando accion post product')
        dispatch({
          type: POST_PRODUCTS,
          payload: res.data.data
        })
      })
      .catch(err=>{
        console.log(err.response.data)
      })
  };
};

export default postSale;