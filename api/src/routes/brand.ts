import { Router, Request, Response } from 'express';
import { Brand } from '../models/Brand';
const router = Router();


router.get('/', async(req: Request, res: Response) => {

  console.log('estoy en brand');

  const brandFound = await Brand.findAll()

  res.send({ ok: true, brandFound })
  
})

router.post('/new', async(req: Request, res: Response) => {
  const {description}=req.body;

  await Brand.create({ description })

  res.json({ ok:true, description })

})

export default router;
