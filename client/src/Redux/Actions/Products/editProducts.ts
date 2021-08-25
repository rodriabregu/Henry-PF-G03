import axios from 'axios';
import { RiContactsBookLine } from 'react-icons/ri';
import config from '../../../config'
export const EDIT_PRODUCTS = 'EDIT_PRODUCTS';

const editProducts = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/product`, dataProduct)
            .then(res => {
                console.log('despacha la accion al reducer')
                dispatch({
                    type: EDIT_PRODUCTS,
                    payload: res.data.data
                })
            })
            .catch(err => {
                console.log('edito el producto pero no llego a desapachar la accion')
                console.log('err')
            })
    };
};

export default editProducts;