import { Router } from 'express';

const router = Router();

import controllers from '../controllers'
controllers(router)

import products from './products';
import category from './categories';
import users from './users';
import categoryTypes from './categoryTypes';
import ProductCategoryRoute from './productCategory';
import productName from './ProductName';
import productId from './ProductId';
import brand from './brand';
import reviews from './reviews'

router.use('/api/products/category', ProductCategoryRoute);
router.use('/api/products', products);
router.use('/api/categories', category);
router.use('/api/users', users);
router.use('/api/brand', brand);
router.use('/api/categoryTypes', categoryTypes);
router.use('/api/product/name', productName);
router.use('/api/product/id', productId);
router.use('/api/reviews', reviews)

export default router;