import axios from 'axios';
import config from '../../../../src/config'
import { UPDATE_CART, item } from './updateCart'

export const getCart = ( userId: string | undefined) => {

  return async (dispatch: Function) => {
    try {
      const items: item[] = JSON.parse(
        localStorage.getItem('products-cart') || "[]"
      )

      if (userId) {
        const res = await axios.get(
          `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${userId}`
        )
        items.concat(res.data.data.items)
      }

      return dispatch({
        type: UPDATE_CART,
        payload: items
      })

    } catch (error) {
      console.error(error.message || error)
    }
  }

}