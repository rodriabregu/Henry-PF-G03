import axios from 'axios';
export const GET_SALES = 'GET_SALES';

export function getSales() {
    return async (dispatch:any) => {
        const res:any = await axios.get('http://localhost:3001/sales')
        dispatch({ type: GET_SALES, payload: res.data.data })
    };
};