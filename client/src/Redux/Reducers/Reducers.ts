import { GET_PRODUCTS } from '../Actions/getProducts';
import { GET_PRODUCTS_DETAIL } from '../Actions/getProductsDetail';

const initialState = {
  products: [],
  productsDetail: [],
  filtros: [],
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
        productsDetail: state.products.filter(
          (product: any) => product.id === action.payload ||  product.name === action.payload.toLowerCase(),
        ),
      };
    default:
      return state;
  }
}

export default getProductReducer;
