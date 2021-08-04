import { Router, Request, Response } from 'express';
import { sequelize } from '../db';

const { Product } = sequelize.models;
import { Photo } from '../models/Photo';

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send('estoy en get productos')
})

//const photo: Photo = Photo.create( {url: 'https://', alt: "text"})

router.post('/', (req: Request, res: Response) => {

  Product.create({ name: 'produc name' })
    .then((produc) => {
      return Photo.create({ 
        productId: produc.getDataValue('id'),
        url: 'https://', alt: "text" 
       })
    })
    .then((produc) =>{
      console.log("producId", produc)
      return Product.findOne({
        where: { id: produc.getDataValue('productId') },
        include: "photos",
      });
    })
    .then((produc) =>{
      res.send(produc);
    })
    .catch((err) => { res.send(err) })

})

export default router;
