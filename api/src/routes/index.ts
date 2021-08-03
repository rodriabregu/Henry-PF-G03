import {Router} from 'express';
const router=Router();
import productRoute from './products';
import categoryRoute from './categories';

import users from './users';
import rutax from './rutax';

router.use('/products',productRoute)
router.use('/categories',categoryRoute)

router.use('/users', users);
router.use('/rutax', rutax);

export default router;
