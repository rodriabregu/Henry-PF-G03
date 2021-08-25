import axios from 'axios';
import config from '../../../config'
export const POST_SALE = 'POST_SALE';

export const PostSale = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.post(`http://${config.REACT_APP_API_URL}:${config.port}/api/sale`, dataProduct)
            .then(res => {
                dispatch({
                    type: POST_SALE,
                    payload: res.data.sale
                })
            })
    };
};