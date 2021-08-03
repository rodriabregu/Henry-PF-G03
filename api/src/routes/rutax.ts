import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('soy la ruta x get!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('soy la ruta x post!');
});

export default router;