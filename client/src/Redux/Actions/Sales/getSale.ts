import axios from 'axios';
import config from '../../../config'
export const GET_SALES = 'GET_SALES';

export function getSales() {
    return async (dispatch:any) => {
        const res:any = await axios.get(`http://${config.REACT_APP_API_URL}:${config.port}/api/sales`)
        dispatch({ type: GET_SALES, payload: res.data.data })
    };
};