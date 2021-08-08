import error from "./error";
import appRes from "./appRes";
import appPhoto from "./appPhoto";
import appProduct from "./appProduct";

import { sequelize } from '../db';
const {
  Product, Photo, Category, Brand,
} = sequelize.models;

const options = {
  attributes: { exclude: ['updatedAt', 'createdAt'] },
  include: [
    { model: Brand, attributes: ['name', 'id'] },
    { model: Category, attributes: ['name', 'id'] },
    { model: Photo, attributes: ['url', 'id'] }
  ]
}

export {
  options,
  error,
  appRes,
  appPhoto,
  appProduct
}