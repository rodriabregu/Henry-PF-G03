import { Router, Request, Response } from 'express';
//import { Product } from '../models/Product';
import { sequelize } from '../db';
import { Photo } from '../models/Photo';
const { Product } = sequelize.models
const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send('estoy en get productos')
})

router.post('/', (req: Request, res: Response) => {

  Product.create({}).then(() => {
    res.send('photo guardada')
  }).catch((err) => {
    res.send(err)
  })
})

export default router;
