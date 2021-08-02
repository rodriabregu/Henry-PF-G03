import {Router} from 'express';
const router=Router();
import productRoute from './products';
import categoryRoute from './categories';

router.use('/products',productRoute)
router.use('/categories',categoryRoute)




export default router;

