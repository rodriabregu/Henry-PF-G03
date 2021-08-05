import { Router, Request, Response } from 'express';

import { addProduct } from '../providers';
import { appProduct } from "../@app"
import { sequelize } from '../db';

const { Product, Photo } = sequelize.models;

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send('estoy en get productos')
})

router.post('/', (req: Request, res: Response) => {
  const { product, photos } = req.body
  if (!product.name || !photos || photos.length <= 0)
    return res.status(404).send({
      message: " uuups !! ",
      data: {}
    })
  return addProduct(product, photos)
    .then((product: appProduct) => {
      res.json({
        message: " product saved successfully ",
        data: { product }
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
