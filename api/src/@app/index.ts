import error from "./error";
import appRes from "./appRes";
import appPhoto from "./appPhoto";
import appProduct from "./appProduct";
import {Op} from 'sequelize' 
import { sequelize } from '../db';
const {
  Product, Photo, Category, Brand,
} = sequelize.models;

const productOptions = {
  attributes: { exclude: ['updatedAt', 'createdAt'] },
  /*where:{
    'stock':{
      [Op.gt]:27
    }
  },*/
  include: [
    { model: Brand, attributes: ['name', 'id'] },
    { model: Category, attributes: ['name', 'id'] },
    { model: Photo, attributes: ['url', 'id'] }
  ]
}

export {
  productOptions,
  error,
  appRes,
  appPhoto,
  appProduct
}