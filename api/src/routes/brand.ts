import { Router, Request, Response } from 'express';
import { Brand } from '../models/Brand';
const router = Router();


router.get('/', async(req: Request, res: Response) => {

  console.log('estoy en brand');

  const BrandNueva = await Brand.create({description:'Crotone'})

  res.send('marca crotone creada')
  
})

export default router;