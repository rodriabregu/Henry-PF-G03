import { Router } from 'express';

const router = Router();

import productsRoute from './productsRoute';
import categoryRoute from './categories';
import usersRoute from './users';
import rutax from './rutax';
import categoryTypeRoute from './categoryTypes';
import productsCategoryRoute from './productsCategory';
import productName from './ProductName';
import productId from './ProductId';

router.use('/products/category', productsCategoryRoute);
router.use('/products', productsRoute);
router.use('/categories', categoryRoute);
router.use('/users', usersRoute);
router.use('/rutax', rutax);
router.use('/categoryTypes',categoryTypeRoute);
router.use('/product/name',productName); 
router.use('/categoryTypes',categoryTypeRoute);
router.use('/product/id',productId);

export default router;