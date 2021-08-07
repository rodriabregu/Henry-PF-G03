import { Dispatch } from 'react';
import axios from 'axios';
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY';


export function getProductsByCategory(category:string) {
    return{
        type: GET_PRODUCTS_BY_CATEGORY,
        payload:category
    }
  }

