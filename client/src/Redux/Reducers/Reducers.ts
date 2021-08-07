import Products from '../../Components/Products/Products';
import { GET_PRODUCTS } from '../Actions/getProducts';
import { GET_PRODUCTS_DETAIL } from '../Actions/getProductsDetail';
import { POST_PRODUCTS } from '../Actions/postProducts';

const initialState = {
  products: [],
  productsDetail: {},
  categories: [],
};


function getProductReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCTS_DETAIL:
      return {
        ...state,
        productsDetail:action.payload
      };
      case POST_PRODUCTS:
        return{
          ...state,
          products:[...state.products, action.payload]
        }
    default:
      return state;
  }
}

export default getProductReducer;
