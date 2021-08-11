import { Router } from 'express';

const router = Router();

import controllers from '../controllers'
controllers(router)

import products from './products';
import category from './categories';
import users from './users';
import categoryTypes from './categoryTypes';
import ProductCategoryRoute from './ProductCategory';
import productName from './ProductName';
import productId from './ProductId';
import brand from './brand';
import reviews from './reviews'

router.use('/products/category', ProductCategoryRoute);
router.use('/products', products);
router.use('/categories', category);
router.use('/users', users);
router.use('/brand', brand);
router.use('/categoryTypes', categoryTypes);
router.use('/product/name', productName);
router.use('/product/id', productId);
router.use('/reviews', reviews)

export default router;