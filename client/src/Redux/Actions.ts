import axios from "axios"

interface IGetProducts {
    json():object,
}

export function getProducts(){
    return function(dispatch:any){
        return axios.get("")
        .then((response)=>response.json())
        .then((json)=>{
            dispatch({
                type: GET_PRODUCTS,
                payload: action.payload })
        })
    }
}

export function getProductDetail(){
    return function(dispatch:any){
        return axios.get("")
                    .then((response)=>response.json())
                    .then((response)=>{
                        dispatch({
                            type:GET_PRODUCTS_DETAIL,
                            payload: action.payload,
                        })
                    })
    }
}