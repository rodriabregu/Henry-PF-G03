import { GET_PRODUCTS } from '../Actions/Products/getProducts';
import { GET_PRODUCTS_DETAIL } from '../Actions/Products/getProductsDetail';
import { GET_FILTERED_PRODUCTS } from '../Actions/Products/getFilteredProducts';
import { POST_PRODUCTS } from '../Actions/Products/postProducts';
import { CLEAR_FILTERS } from '../Actions/Products/clearFilters';
import { ADD_CART_PRODUCTS } from '../Actions/Products/addingCart';
import { EDIT_PRODUCTS } from '../Actions/Products/editProducts';
import { POST_SALE } from '../Actions/Sales/postSale';
import { GET_SALES } from '../Actions/Sales/getSale';
import { PUT_SALE } from '../Actions/Sales/putSale';
import { UPDATE_CART, item } from '../Actions/Cart/updateCart'
import { POST_USER } from '../Actions/Users/postUser';

const initialState = {
  products: [], //filtro o todos
  productsDetail: {},
  AllProducts: [],
  cartProducts: [],
  sales: [],
  url_pago: "",
  cart: [],
  users: [],
};

interface brand {
  name: string
  id: number
}

interface photo {
  url: string
  id: number
}

interface category {
  name: string
  id: number
}

export interface product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  brand: brand
  photos: photo[]
  categories: category[]
}

export interface state {
  products: product [], //filtro o todos
  productsDetail: {},
  AllProducts: product[],
  cartProducts: {}[],
  sales: {}[],
  url_pago: string,
  cart: item[],
  users: any[],
};


function getProductReducer(state: state = initialState, action: any): state {
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
    case UPDATE_CART:
      return { ...state, cart: action.payload }
    case POST_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return initialState;
  };
};

export default getProductReducer;