import axios from 'axios';
import config from '../../../../src/config';
import { review } from '../../../typesApp'

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addReview = (review: review, userId: string | undefined) => {

  return async (dispatch: Function) => {
    try {
      await axios.post(`http://${config.REACT_APP_API_URL}:3001/api/reviews`, review);
      const res: any = await axios.get(
        `http://${config.REACT_APP_API_URL}:3001/api/product/${review.ProductId}`
      )
      dispatch({
        type: UPDATE_PRODUCT,
        payload: res.data.product
      })
    } catch (error) {
      console.error(error.message || error)
    }
  };
};