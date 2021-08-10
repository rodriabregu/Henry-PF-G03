import { Router, Request, Response } from 'express';
import { CategoryType } from '../db'
const router = Router();

router.get('/', async (req: Request, res: Response) => {

  console.log('TypeCategory Get Route');

  const categoryType = await CategoryType.findAll()

  res.send({ ok: true, categoryType })

})

router.post('/new', async (req: Request, res: Response) => {
  const { description } = req.body;

  const categoryTypeNew = await CategoryType.create({ description })

  res.json({ ok: true, categoryTypeNew })

})

export default router;