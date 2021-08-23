import axios from 'axios';
import config from '../../../../src/config';
export const POST_USER = 'POST_USER';

export interface user {
  id: string
  userName: string
  email: string
  hashPasword: string
  firstName: string
  lastName: string
}

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