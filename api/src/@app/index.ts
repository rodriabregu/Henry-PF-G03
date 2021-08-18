import error from "./error";
import appRes from "./appRes";
import appPhoto from "./appPhoto";
import appProduct from "./appProduct";
import appUser from './appUser'
import appItem from './appItem'

import {
  Photo, Review, Category, Brand,
} from '../db';

const productOptions = {
  attributes: { exclude: ['updatedAt', 'createdAt'] },
  include: [
    {
      model: Review, attributes: {
        exclude: ['updatedAt', 'createdAt']
      }
    },
    { model: Brand, attributes: ['name', 'id'] },
    { model: Category, attributes: ['name', 'id'] },
    { model: Photo, attributes: ['url', 'id'] }
  ]
}

export {
  productOptions,
  error,
  appItem,
  appUser,
  appRes,
  appPhoto,
  appProduct
}