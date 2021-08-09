import { Router, Request, Response } from 'express';
import { CreatedAt } from 'sequelize-typescript';
const router = Router();
import {Category} from '../models/Category'

router.get('/', async(req: Request, res: Response) => {
  const categories=await Category.findAll(
    {
      order:['name']
    }
  );
  res.json(categories)  
})

router.post('/', async(req: Request, res: Response) => {
    const {description}=req.body;

    await Category.create({
      description
    })

    res.json({
      ok:true,
      description
    })

})

export default router;
