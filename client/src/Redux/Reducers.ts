const initialState = {
    products: [],
    productsDetail:[],
  };

  export default function rootReducer(state = initialState, action:any){
      switch (action.type) {
          case "GET_PRODUCTS":
              return {
                  ...state,
                  products:action.payload
              }
            case "GET_PRODUCTS_DETAIL":
                return{
                    ...state,
                    productsDetail: action.payload
                }
            default:
                return state;
      }
  }

