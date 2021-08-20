import axios from 'axios';
import config from '../../../../src/config'
import { UPDATE_CART, item } from './updateCart'

export const getCart = () => {
  let isLogin: boolean = true
  const userId: number = 1
  return async (dispatch: Function) => {
    try {
      if (isLogin) {
        const res = await axios.get(
          `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${userId}`
        )
        return dispatch({
          type: UPDATE_CART,
          payload: res.data.data.items
        })
      } else {
        const items: item[] = JSON.parse(localStorage.getItem('products-cart') || "[]")
        return dispatch({
          type: UPDATE_CART,
          payload: items
        })
      }

    } catch (error) {
      console.error(error.message || error)
    }
  }

}