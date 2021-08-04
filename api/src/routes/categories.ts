import { Router, Request, Response } from 'express';
const router = Router();
import {Category} from '../models/Category'

router.get('/', async(req: Request, res: Response) => {


  
})

router.post('/', (req: Request, res: Response) => {
  res.send('creando una categoria')
})

export default router;
