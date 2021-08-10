import { Response, Request, Router } from 'express';
import {
  User, Sale, Product
} from '../db'
const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('soy la ruta users get!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('soy la ruta users post!');
});

export default router;