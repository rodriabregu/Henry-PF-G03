import { Router, Request, Response } from 'express';

import { addProduct } from '../providers';
import { appProduct } from "../@app"

import { sequelize } from '../db';
const {
  Product, Photo, Category, ProductsCategory
} = sequelize.models;

const router = Router();

const config = {
  attributes: { exclude: ['updatedAt', 'createdAt'] },
  include: [
    { model: Category, attributes: ['name', 'id'] },
    { model: Photo, attributes: ['url', 'id'] }
  ]
}

router.get('/', (_req: Request, res: Response) => {
  return Product
    .findAll(config)
    .then((products) => {
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
    "name": " Esteban pack",
    "price": 54,
    "stock": 15,
    "description": "zeuscalabria",
    "brand": "NIKE"
  },
  "photos": ["https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg", "photoN"],
  "descriptions": ["description1", "descriptionN"],
  "brands": ["brand1"],
  "categories": [2, 3],
  "brand": "NIKE"
}

router.post('/', (req: Request, res: Response) => {
  const {
    product, photos, categories, comments, brand
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

  //if (categories && categories[0]) product.category = categories[0];
  if (comments && comments[0]) product.commentary = comments[0];
  //if (photos && photos[0]) product.photo = photos[0];
  if (brand) product.brand = brand;

  return addProduct(product,
    photos || [product.photo],
    categories || [product.category]
  )
    .then((productId) => {
      return Product.findOne({
        where: { id: productId }, ...config,
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
