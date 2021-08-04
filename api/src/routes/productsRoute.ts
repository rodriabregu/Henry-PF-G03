import { Response, Request, Router, NextFunction } from 'express';

import getProductsCategory from './getProductsCategory';
import getProducts from './getProducts';
const router = Router();

router.use('/category/', getProductsCategory);
router.use(getProducts);

export default router;