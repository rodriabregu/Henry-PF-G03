import { Request, Response, Router } from 'express'
import { Sale, SaleItem } from '../db';
const router = Router();




router.get('/', async (req: Request, res: Response) => {

    Sale.findAll({
        attributes: { exclude: ['updatedAt', 'createdAt'] },
        include: [
            {
                model: SaleItem,
                attributes: { exclude: ['updatedAt', 'createdAt'] }
            }
        ]
    })
    .then(resp=>{
        return res.json(resp)
    })
    .catch(err=>{
        return res.status(400).json(err)
    })

})




export default router;










