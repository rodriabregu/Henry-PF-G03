import { Router } from 'express';

const router = Router();

import { postSale } from '../controllers'
router.post('/sale', postSale);

import products from './products';
import category from './categories';
import usersRoute from './users';
import categoryTypes from './categoryTypes';
import ProductCategoryRoute from './ProductCategory';
import productName from './ProductName';
import productId from './ProductId';
import brandRoute from './brand';
import reviews from './reviews'

router.use('/products/category', ProductCategoryRoute);
router.use('/products', products);
router.use('/categories', category);
router.use('/users', usersRoute);
router.use('/brand', brandRoute);
router.use('/categoryTypes',categoryTypes);
router.use('/product/name',productName); 
router.use('/product/id',productId);
router.use('/reviews',reviews)

export default router;