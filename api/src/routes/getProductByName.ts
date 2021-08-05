/* 
 * Root : /get/product/name/:nameSearched
 * Crear la ruta para obtener los detalles de un producto 
 * ingresando por parámetro el nombre del producto
 */

import { Response, Request, Router } from 'express';

const router = Router();

router.get('/:name', (req: Request, res: Response) => {
  res.send(`Consult product by name : ${req.params.name}`);
});

export default router;