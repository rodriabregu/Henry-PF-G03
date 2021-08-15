import axios from 'axios';
export const EDIT_PRODUCTS = 'EDIT_PRODUCTS';

const editProducts = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.put(`http://localhost:3001/productsUpdate`, dataProduct)
            .then(res => {
                dispatch({
                    type: EDIT_PRODUCTS,
                    payload: res
                })
            })
    };
};

export default editProducts;