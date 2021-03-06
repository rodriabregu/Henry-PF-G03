import { Router } from 'express';

const router = Router();

import getCart from '../controllers/getCart'
import getEmailCart from '../controllers/getEmailCart'
import getProduct from '../controllers/getProduct'
import getProducts from '../controllers/getProducts'
import getSales from '../controllers/getSales'
import getSalesUser from '../controllers/getSalesUser'
import getUser from '../controllers/getUser'
import getUsers from '../controllers/getUsers'
import postProduct from '../controllers/postProduct'
import postSale from '../controllers/postSale'
import postUser from '../controllers/postUser'
import putCart from '../controllers/putCart'
import putProduct from '../controllers/putProduct'
import putSale from '../controllers/putSale'
import getUsersInfo from '../controllers/getUsersInfo'
import putUserRol from '../controllers/putUserRol';
import deleteUser from '../controllers/deleteUser';

import products from './products';
import category from './categories';
import categoryTypes from './categoryTypes';
import ProductCategoryRoute from './productCategory';
import productName from './ProductName';
import productId from './ProductId';
import brand from './brand';
import reviews from './reviews'
import photos from './photo'
import favs from './favourites'
import destiny from './destiny'
import stats from './stats'

router.get('/cart/:userId', getCart)
router.get('/cart/:userId/')
router.get('/cart/Emails/:userId', getEmailCart)
router.get('/products', getProducts)
router.get('/product/:producId', getProduct)
router.get('/sales', getSales)
router.get('/sales/user/:userId', getSalesUser)
router.get('/user/:userId', getUser)
router.get('/users', getUsers)
router.post('/product', postProduct)
router.post('/sale', postSale)
router.post('/user', postUser)
router.put('/cart/:userId', putCart)
router.put('/product', putProduct)
router.put('/sale', putSale)
router.get('/getUsersInfo',getUsersInfo)
router.put('/putRol',putUserRol)
router.put('/deleteUser',deleteUser)

router.use('/products/category', ProductCategoryRoute);
router.use('/products', products);
router.use('/categories', category);
router.use('/brand', brand);
router.use('/categoryTypes', categoryTypes);
router.use('/product/name', productName);
router.use('/product/id', productId);
router.use('/reviews', reviews)
router.use('/photos', photos)
router.use('/favs', favs)
router.use('/destiny', destiny)
router.use('/stats',stats)

export default router;