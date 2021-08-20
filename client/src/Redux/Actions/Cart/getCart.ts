import axios from 'axios';
import config from '../../../../src/config'
import { UPDATE_CART } from './updateCart'

export const getCart = () => {
  let isLogin: boolean = true
  return async (dispatch: Function) => {
    try {
      if (isLogin) {
        const userId: number = 1

        const res = await axios.get(
          `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${userId}`
        )
        return dispatch({
          type: UPDATE_CART,
          payload: res.data.data.items
        })
      }

      //localStorage.setItem('products-cart', JSON.stringify(items));

    } catch (error) {
      console.error(error.message || error)
    }
  }

}