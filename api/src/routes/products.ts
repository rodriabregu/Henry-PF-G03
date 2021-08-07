import { Router, Request, Response } from 'express';

import { addProduct } from '../providers';
import { appProduct } from "../@app"

import { sequelize } from '../db';
import categories from './categories';
const { Product, Photo, Category, Categories } = sequelize.models;

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return Product.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: Category
  }).then((products) => {
      return res.json({
        message: 'Success',
        data: products
      })
    })

})

/* de los campos repetidos deve estar
 almenos uno en su respectivo formato*/
const body = {
  "product": {
    "name": " Esteban 6 pack",
    "price": 54,
    "stock": 15,
    "description": "zeuscalabria",
    "brand": "NIKE",
  },
  "photos": ["https://www.z", "photoN"],
  "comments": ["omentario por ahora el primero", "commentsN"],
  "categories": ["deportes", "categoryN"]
}


router.post('/', (req: Request, res: Response) => {
  const {
    product, photos, categories, comments
  } = req.body

  if (!(
    product
    && product.name
    && typeof product.name === "string"
    && (product.photo || photos)
  ))
    return res.status(404).json({
      message: " body data is not validate ",
      data: {}
    })

  if (categories && categories[0]) product.category = categories[0];
  if (comments && comments[0]) product.commentary = comments[0];

  return addProduct(product, photos)
    .then((productId) => {
      return Product.findOne({
        where: { id: productId },
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: { model: Category, attributes: ['name'] }

      })
    })
    .then((product) => {
      return res.json({
        message: " product saved successfully ",
        data: product
      })
    })
    .catch((error) => {
      return res.status(404).json({
        message: " failed operation ",
        error,
        data: {}
      })
    })
})

export default router;
