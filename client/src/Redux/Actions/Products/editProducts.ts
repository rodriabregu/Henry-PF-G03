import axios from 'axios';
import config from '../../../config'
export const EDIT_PRODUCTS = 'EDIT_PRODUCTS';

const editProducts = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.put(`${config.REACT_APP_API_URL}:${config.port}/productsUpdate`, dataProduct)
            .then(res => {
                dispatch({
                    type: EDIT_PRODUCTS,
                    payload: res
                })
            })
    };
};

export default editProducts;