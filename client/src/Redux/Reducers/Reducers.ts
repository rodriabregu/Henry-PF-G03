import { GET_PRODUCTS } from '../Actions/Products/getProducts';
import { GET_PRODUCTS_DETAIL } from '../Actions/Products/getProductsDetail';
import { GET_FILTERED_PRODUCTS } from '../Actions/Products/getFilteredProducts';
import { POST_PRODUCTS } from '../Actions/Products/postProducts';
import { CLEAR_FILTERS } from '../Actions/Products/clearFilters';
import { EDIT_PRODUCTS } from '../Actions/Products/editProducts';
import { POST_SALE } from '../Actions/Sales/postSale';
import { GET_SALES } from '../Actions/Sales/getSale';
import { PUT_SALE } from '../Actions/Sales/putSale';
import { UPDATE_CART } from '../Actions/Cart/updateCart';
import { UDATE_USER } from '../Actions/Users/postUser';
import { UPDATE_PRODUCT } from '../Actions/Products/addReview'
import { state, product,userNull, productNull } from '../../typesApp'

const initialState: state = {
  products: [], //filtro o todos
  productsDetail: productNull,
  AllProducts: [],
  sales: [],
  url_pago: "",
  cart: [],
  user: userNull
};

export interface action {
  type: string
  payload: any;
}

function getProductReducer(state: state = initialState, action: action): state {
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
    case CLEAR_FILTERS:
      return {
        ...state,
        products: state.AllProducts
      }
    case POST_PRODUCTS:
      console.log('nuevo producto ',action.payload)
      console.log('nuevo arreglo de productos ',[...state.products,action.payload])
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case EDIT_PRODUCTS:
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    case POST_SALE:
      return {
        ...state,
        url_pago: action.payload.data.data.url_pago,
        sales: [...state.sales, action.payload]
      }
    case GET_SALES:
      return {
        ...state,
        sales: action.payload,
      };
    case PUT_SALE:
      return {
        ...state,
        sales: state.sales.filter((p: any) => p.id !== action.payload.id).concat(action.payload)
      };
    case UPDATE_PRODUCT:
      return {
        ...state, products: state.products.map<product>(
          (product: product): product => {
            if (product.id === action.payload.id)
              return action.payload
            else return product
          })
      }
    case UPDATE_CART:
      return { ...state, cart: action.payload }
    case UDATE_USER:
      return {
        ...state, user: action.payload
      };
    default:
      return state;
  };
};

export default getProductReducer;