import axios from "axios";
import config from '../../../config';
export const PUT_SALE = 'PUT_SALE';

export const putSale = (objeto: any) => {
  return async (dispatch: any) => {
    try {
      const resPut: any = await axios.put(
        `http://${config.REACT_APP_API_URL}:${config.port}/api/sale`, objeto
      )
      dispatch({
        type: PUT_SALE,
        payload: resPut
      })

    } catch (error) {
      console.error(error.message || error)
    }
  }
};