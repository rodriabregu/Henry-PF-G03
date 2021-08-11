import { Router, Request, Response } from 'express';
import { Review } from '../models/Review';
const router = Router();



router.post('/', async (req: Request, res: Response) => {

    try {
        const { userId, ProductId, stars, text } = req.body;
        Review.create({ text, stars, ProductId })
        res.json("Review added succesfully");
    } catch (e) {
        console.log(e);
    }

})

router.get('/:id', async (req: Request, res: Response) => {

    const {id}=req.params;
    try {
        const reviews = await Review.findAll({where:{ProductId:id}});
        res.json(reviews);

    } catch (e) {
        console.log(e)
    }
})





export default router;






