import { Router } from 'express';

const router = Router();

import postUser from '../controllers/postUser'
import postSale from '../controllers/postSale'
import putSale from '../controllers/putSale'
import getSales from '../controllers/getSales'
import getSalesUser from '../controllers/getSalesUser'
import putProduct from '../controllers/putProduct';

import products from './products';
import productsUpdate from './productsUpdate';
import category from './categories';
import users from './users';
import categoryTypes from './categoryTypes';
import ProductCategoryRoute from './productCategory';
import productName from './ProductName';
import productId from './ProductId';
import brand from './brand';
import reviews from './reviews'
import photos from './photo'
import favs from './favourites'

router.put('/product',putProduct)
router.post('/user', postUser)
router.post('/sale', postSale)
router.put('/sale', putSale)
router.get('/sales', getSales)
router.get('/sales/user/:userId', getSalesUser)

router.use('/products/category', ProductCategoryRoute);
router.use('/products', products);
router.use('/productsUpdate', productsUpdate);
router.use('/categories', category);
router.use('/users', users);
router.use('/brand', brand);
router.use('/categoryTypes', categoryTypes);
router.use('/product/name', productName);
router.use('/product/id', productId);
router.use('/reviews', reviews)
router.use('/photos',photos)
router.use('/favs',favs)

export default router;