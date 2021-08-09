import { Router, Request, Response } from 'express';
const router = Router();
import {Category} from '../models/Category'

router.get('/', async(req: Request, res: Response) => {
  const categoriesAll=await Category.findAll(
    {
      order:['name']
    }
  );
  res.json(categoriesAll)  
})

router.post('/new', async(req: Request, res: Response) => {
    let {categoryTypeId, name}=req.body;

    name=name.toLowerCase();
    name=name.replace(/\w\S*/g, (w:any) => (w.replace(/^\w/, (c:any) => c.toUpperCase())));

    const categoryNew = await Category.create({
      categoryTypeId,
      name
    })

    res.json({
      ok:true,
      categoryNew
    })

})

export default router;
