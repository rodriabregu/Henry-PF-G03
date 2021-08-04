import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('soy getProductCategory get!');
});

export default router;