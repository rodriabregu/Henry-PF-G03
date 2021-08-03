const initialState = {
    products: [],
    productsDetail:[],
  };

  export default function getProductReducer(state = initialState, action:any){
      switch (action.type) {
          case "GET_PRODUCTS":
              return {
                  ...state,
                  products:action.payload
              }
            case "GET_PRODUCTS_DETAIL":
                return{
                    ...state,
                    productsDetail: state.products.filter((product:any)=>product.id !== action.payload)
                }
            default:
                return state;
      }
  }

