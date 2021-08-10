import { Router, Request, Response } from 'express';
import { Review } from '../models/Review';
const router = Router();



router.post('/', async (req: Request, res: Response) => {

    try {
        const { userId, ProductId, stars, text } = req.body;
        const review = await Review.create({ text, stars, ProductId })
        res.json("Revie added succesfully");
    } catch (e) {
        console.log(e);
    }

})

router.get('/', async (req: Request, res: Response) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);

    } catch (e) {
        console.log(e)
    }
})





export default router;






