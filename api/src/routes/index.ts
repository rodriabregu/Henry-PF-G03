import { Router } from 'express';

const router = Router();

import productRoute from './products';
import getProductsCategory from './getProductsCategory';
import categoryRoute from './categories';
import usersRoute from './users';
import rutax from './rutax';
import categoryTypeRoute from './categoryTypes'

router.use('/products/category/', getProductsCategory);
router.use('/products', productRoute);
router.use('/categories', categoryRoute);
router.use('/users', usersRoute);
router.use('/rutax', rutax);
router.use('/categoryTypes',categoryTypeRoute)

export default router;