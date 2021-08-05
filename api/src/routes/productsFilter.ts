/* 
 * Root : /get/product/filter
 * si se hace un get en esta ruta se debe obtener los productos 
 * que contengan una o varias categorías especificadas
 */

import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('soy la ruta get/product/filter !');
});

export default router;