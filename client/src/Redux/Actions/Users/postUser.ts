import axios from 'axios';
import config from '../../../../src/config';
export const POST_USER = 'POST_USER';

export const PostUser = (dataProduct: any) => {
    return async (dispatch: any) => {
        await axios.post(`http://${config.REACT_APP_API_URL}:${config.port}/api/user`, dataProduct)
            .then(res => {
                dispatch({
                    type: POST_USER,
                    payload: res
                })
            })
    };
};