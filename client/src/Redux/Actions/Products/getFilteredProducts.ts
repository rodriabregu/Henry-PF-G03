import { Dispatch } from 'react';
import axios from 'axios';
export const GET_FILTERED_PRODUCTS = 'GET_FILTERED_PRODUCTS';


export function getFilteredProducts(category:string) {
    console.log('action: ',category);
    return{
        type: GET_FILTERED_PRODUCTS,
        payload:category
    }
  }

