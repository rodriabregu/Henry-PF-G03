import { Router, Request, Response } from 'express';

import { addProduct } from '../providers';
import { appProduct } from "../@app"

import { sequelize } from '../db';
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
    "brand": "NIKE",
    "category": "deportes"
  },
  "photos": ["photo1", "photoN"],
  "descriptions": ["description1", "descriptionN"],
  "brands": ["brand1", "brand"],
  "categories": ["category1", "categoryN"]
}

router.post('/', (req: Request, res: Response) => {
  const { product, photos } = req.body
  if (!(
    product
    && product.name
    && typeof product.name === "string"
    && (product.photo || photos)
  ))
    return res.status(404).json({
      message: " product is not validate ",
      data: {}
    })

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
    .catch((error)=>{
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
