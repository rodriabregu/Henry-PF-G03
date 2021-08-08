import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';
import { Photo } from '../models/Photo'
import { Category } from '../models/Category';
import {Brand} from '../models/Brand'

const router = Router();

//Response Product Detail - access by Product ID
router.get('/:id', async (req: Request, res: Response) => {
  //const ProductNew = await Product.create({name:'zapatilla', description: 'adidas crotone', amount: 100})

  console.log(req.params.id);

  try {
    // Search product in DB
    let productFound = await Product.findByPk(req.params.id, {
      include: [
        {model:Photo},
        {model:Category},
        {model:Brand}
      ]
    }
    );

    if (productFound) return res.send(productFound);

    throw new Error();
  } catch (error) {
    res.status(404).send(`Product ID : ${req.params.id} not found!`);
  }
});

export default router;
