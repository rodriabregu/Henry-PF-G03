import axios from "axios";
import config from '../../../config';
export const PUT_SALE = 'PUT_SALE';

export const putSale = (objeto:any) => {
    return async (dispatch: any) => {
    await axios.put(`http://${config.REACT_APP_API_URL}:${config.port}/api/sale`,objeto)
        .then(res => {
            dispatch({
                type: PUT_SALE,
                payload: res
            })
        })
    }
};