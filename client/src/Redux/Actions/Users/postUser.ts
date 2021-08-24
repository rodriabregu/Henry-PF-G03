import axios from 'axios';
import config from '../../../../src/config';
import { user } from '../../../typesApp'
export const POST_USER = 'POST_USER';

export const postUser = (dataUser: user) => {
    return async (dispatch: Function) => {
        await axios.post(`http://${config.REACT_APP_API_URL}:${config.port}/api/user`, dataUser)
            .then(res => {
                dispatch({
                    type: POST_USER,
                    payload: res.data.user
                })
            })
            .catch(error => {
              console.error(error)
            })
    };
};