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

router.post('/', (req: Request, res: Response) => {
  const product = req.body
  if (!(
    product &&
    product.name &&
    typeof product.name === "string" &&
    product.photos[0] &&
    typeof product.photos[0] === "string"
  )) {
    return res.status(404).json({
      message: " product is not validate ",
      data: {}
    })
  }

  return addProduct(product)
    .then((product: appProduct) => {
      return res.json({
        message: " product saved successfully ",
        data: product
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
