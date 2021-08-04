import { Router } from 'express';

const router = Router();

import productsRoute from './productsRoute';
import categoryRoute from './categories';
import usersRoute from './users';
import rutax from './rutax';
import categoryTypeRoute from './categoryTypes';
import productDetails from './productDetails';

router.use('/products', productsRoute);
router.use('/categories', categoryRoute);
router.use('/users', usersRoute);
router.use('/rutax', rutax);
router.use('/categoryTypes',categoryTypeRoute)
router.use('/productDetails',productDetails)

export default router;