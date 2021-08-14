import { GET_PRODUCTS } from '../Actions/Products/getProducts';
import { GET_PRODUCTS_DETAIL } from '../Actions/Products/getProductsDetail';
import { GET_FILTERED_PRODUCTS } from '../Actions/Products/getFilteredProducts';
import { POST_PRODUCTS } from '../Actions/Products/postProducts';
import { CLEAR_FILTERS } from '../Actions/Products/clearFilters';
import { ADD_CART_PRODUCTS } from '../Actions/Products/addingCart';
import { EDIT_PRODUCTS } from '../Actions/Products/editProducts';
import { POST_SALE } from '../Actions/Sales/postSale';
import { GET_SALES } from '../Actions/Sales/getSale';

const initialState = {
  products: [],//filtro o todos
  productsDetail: {},
  AllProducts: [],//no tocar!
  cartProducts: [],
  sales: [],
  url_pago: null
};

function getProductReducer(state:any = initialState, action: any) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        AllProducts: action.payload,
        products: action.payload,
      };
    case GET_PRODUCTS_DETAIL:
      return {
        ...state,
        productsDetail: action.payload
      };
    case GET_FILTERED_PRODUCTS:
      return {
        ...state,
        products: state.AllProducts.filter((p: any) => p.categories.find((c: any) => c.name === action.payload))
      }
    /*
    return {
      ...state,
      products: state.AllProducts.filter((p: any) => p.category === action.payload)
    }
    */
    case CLEAR_FILTERS:
      return {
        ...state,
        products: state.AllProducts
      }
    case POST_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case EDIT_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case ADD_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: state.cartProducts.concat(action.payload)
      }
      case POST_SALE:
        return {
          ...state, url_pago: action.payload.data.data.url_pago,
          sales: [...state.sales, action.payload]
        }
      case GET_SALES:
        return {
          ...state,
          sales: action.payload,
        };
    default:
      return state;
  };
};

export default getProductReducer;