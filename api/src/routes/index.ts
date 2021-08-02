import {Router} from 'express';
import users from './users';
import rutax from './rutax';

const router = Router();

router.use('/users', users);
router.use('/rutax', rutax);

export default router;