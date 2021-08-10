import { Router } from 'express';

const router = Router();

import { postSale } from '../controllers'
router.post('/sale', postSale);

import products from './products';
import category from './categories';
import usersRoute from './users';
import categoryTypes from './categoryTypes';
import ProductCategory from './productCategory';
import ProductCategoryRenew from './productCategoryRenew';
import productName from './ProductName';
import productId from './ProductId';
import brandRoute from './brand';

router.use('/products/category/renew/', ProductCategoryRenew);
router.use('/products/category', ProductCategory);
router.use('/products', products);
router.use('/categories', category);
router.use('/users', usersRoute);
router.use('/brand', brandRoute);
router.use('/categoryTypes', categoryTypes);
router.use('/product/name', productName);
router.use('/product/id', productId);

export default router;