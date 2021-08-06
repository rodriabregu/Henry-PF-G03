import { Router, Request, Response } from 'express';

import { addProduct } from '../providers';
import { appProduct } from "../@app"

import { sequelize } from '../db';
import categories from './categories';
const { Product, Photo } = sequelize.models;

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return Product.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: {
      model: Photo,
      attributes: ['url']
    }
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
    "photo": "https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg",
    "description": "zeuscalabria",
    "commentary": "comentario por ahora uno",
    "brand": "NIKE",
    "category": "deportes"
  },
  "photos": ["photo1", "photoN"],
  "comments": ["comments", "commentsN"],
  "brands": ["brand1", "brand"],
  "categories": ["category1", "categoryN"]
}


router.post('/', (req: Request, res: Response) => {
  const {
    product, photos, categories, brands, comments
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
  if (brands && brands[0]) product.brand = brands[0];
  if (comments && comments[0]) product.commentary = comments[0];

  return addProduct(product, photos || [product.photo])
    .then((productId) => {
      return Product.findOne({
        where: { id: productId },
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: { model: Photo, attributes: ['url'] }
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

router.delete('/', (_req: Request, res: Response) => {

  Product.create({ name: 'produc name' })
    .then((produc) => {
      return Photo.create({
        productId: produc.getDataValue('id'),
        url: 'https://', alt: "text"
      })
    })
    .then((produc) => {
      console.log("producId", produc)
      return Product.findOne({
        where: { id: produc.getDataValue('productId') },
        include: "photos",
      });
    })
    .then((produc) => {
      res.send(produc);
    })
    .catch((err) => { res.send(err) })

})

export default router;
