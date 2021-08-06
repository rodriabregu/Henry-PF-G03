/* 
 * Root : /get/product/name/:nameSearched
 * Crear la ruta para obtener los detalles de un producto 
 * ingresando por parámetro el nombre del producto
 */

import { Response, Request, Router } from 'express';
import { Product } from '../models/Product';

const router = Router();

router.get('/:name', async (req: Request, res: Response) => {
 
  console.log(req.params.name);

  try {
    // Search product in DB for name
    let productFound = await Product.findOne({ where: {name: req.params.name} });

    if (productFound) return res.send(productFound);

    throw new Error();
  } catch (error) {
    res.status(404).send(`Product Name : ${req.params.name} not found!`);
  }
});

export default router;