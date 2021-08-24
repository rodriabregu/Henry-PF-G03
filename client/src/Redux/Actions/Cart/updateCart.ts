import axios from 'axios';
import config from '../../../../src/config';
import { item } from '../../../typesApp'

export const UPDATE_CART = "UPDATE_CART";

export const updateCart = (items: item[], userId: string | undefined) => {

  return async (dispatch: Function) => {
    try {
      localStorage.setItem(
        'products-cart', JSON.stringify(items)
      );
      if (userId) {
        axios.put(
          `http://${config.REACT_APP_API_URL}:${config.port}/api/cart/${userId}`
          , { userId, items }
        )
      }
      dispatch({
        type: UPDATE_CART,
        payload: items
      })
    } catch (error) {
      console.error(error.message || error)
    }
  };
};