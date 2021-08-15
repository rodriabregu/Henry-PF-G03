import axios from 'axios';
export const POST_SALE = 'POST_SALE';

export const PostSale = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.post(`http://localhost:3001/sale`, dataProduct)
            .then(res => {
                dispatch({
                    type: POST_SALE,
                    payload: res
                })
            })
    };
};