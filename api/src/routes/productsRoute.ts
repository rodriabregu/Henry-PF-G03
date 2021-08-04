import { Router, Request, Response } from 'express';
import { sequelize } from '../db';

const { Product } = sequelize.models;

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.send('estoy en get productos')
})

router.post('/', (req: Request, res: Response) => {

  Product.create({}).then(() => {
    res.send('post en photo guardada')
  }).catch((err) => { res.send(err) })
})

export default router;
