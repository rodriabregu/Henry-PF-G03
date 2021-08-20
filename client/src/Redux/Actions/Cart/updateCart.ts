import axios from 'axios';
import config from '../../../../src/config';

export const UPDATE_CART = "UPDATE_CART"

export interface item {
  productId: number
  units: number
}

export const updateCart = (items: item[]) => {
  let isLogin: boolean = true
  return async (dispatch: Function) => {
    try {
      if (isLogin) {
        console.log("items dis: ", items)
        const userId: number = 1
        /* dispatch({
          type: UPDATE_CART,
          payload: items
        }) */
        const res = await axios.put(
          `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${userId}`
          , { userId, items }
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