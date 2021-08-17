import axios from 'axios';
import config from '../../../config'
export const EDIT_PRODUCTS = 'EDIT_PRODUCTS';

const editProducts = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/product`, dataProduct)
            .then(res => {
                dispatch({
                    type: EDIT_PRODUCTS,
                    payload: res
                })
            })
    };
};

export default editProducts;