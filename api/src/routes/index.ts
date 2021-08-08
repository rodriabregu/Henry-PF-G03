import { Router } from 'express';

const router = Router();

import productsRoute from './products';
import categoryRoute from './categories';
import usersRoute from './users';
import rutax from './rutax';
import categoryTypes from './categoryTypes';
import productsCategoryRoute from './productsCategory';
import productsCategoryRenew from './productsCategoryRenew';
import productName from './ProductName';
import productId from './ProductId';
import brandRoute from './brand';
router.use('/products/category/renew/', productsCategoryRenew);
router.use('/products/category', productsCategoryRoute);
router.use('/products', productsRoute);
router.use('/categories', categoryRoute);
router.use('/users', usersRoute);
router.use('/rutax', rutax);
router.use('/brand', brandRoute);
router.use('/categoryTypes',categoryTypes);
router.use('/product/name',productName); 
router.use('/product/id',productId);

export default router;