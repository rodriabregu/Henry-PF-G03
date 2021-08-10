import { Router, Request, Response } from 'express';
const router = Router();
import { Category } from '../db'

router.get('/', async (req: Request, res: Response) => {
  const categoriesAll = await Category.findAll(
    {
      order: ['name']
    }
  );
  res.json(categoriesAll)
})

router.post('/new', async (req: Request, res: Response) => {
  let { categoryTypeId, name } = req.body;

  name = name.toLowerCase();
  name = name.replace(/\w\S*/g, (w: any) => (w.replace(/^\w/, (c: any) => c.toUpperCase())));

  const categoryNew = await Category.findOrCreate({
    where: { name }
  })

  console.log(categoryNew[1])

  if (categoryNew[1] == false) {
    return res.status(400).json(`Category ${name} already exists`)
  }

  return res.json(`Category '${name}' created!`)

})

export default router;
