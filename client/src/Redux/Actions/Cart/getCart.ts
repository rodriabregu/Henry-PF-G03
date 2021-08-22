import axios from 'axios';
import config from '../../../../src/config'
import { UPDATE_CART, item } from './updateCart'

export const getCart = (userId: string | undefined) => {

  return async (dispatch: Function) => {
    try {
      let items: item[] = JSON.parse(
        localStorage.getItem('products-cart') || "[]"
      )

      if (userId) {
        const res = await axios.get(
          `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${userId}`
        )
        items = res.data.data.items.reduce((items: item[], itemBack: item) => {
          const item: item | undefined = items.find((item: item) => {
            return item.productId === itemBack.productId
          })
          if (item) {
            if (itemBack.units > item.units)
              item.units = itemBack.units
          } else items.push(itemBack)
          return items
        }, items)
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