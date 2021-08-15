import { Request, Response, Router } from 'express'
import { Brand, Photo, User } from '../db';
const router = Router();
import { Product } from '../models/Product';
import ProductUser from '../models/ProductUser';
import Favourites from '../models/ProductUser'

router.post('/', async (req: Request, res: Response) => {

    const { userId, productId } = req.body;
    try {
        await Favourites.create({
            userId,
            productId
        })
    } catch (e) {
        return res.status(400).json({
            err: 'An error ocurred!',
            message: e
        })
    }
    return res.json({
        message: 'Favourite added succesfully'
    })

})

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('id user ', id)

    let products;
    try {
        products=await Product.findAll({
            attributes:['id','name','description','price'],
            include:[
                {
                    model:User,
                    attributes:['userName','email','firstName','lastName'],
                    where:{id:id},
                    through:{attributes:[],where:{isActive:true}}
                },
                {
                    model:Photo,
                    attributes:['url'],
                }
            ]
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            error:e
        })
    }
    return res.json(products)
})


router.put('/',async(req:Request,res:Response)=>{
    const {userId,productId}=req.body; 
    try{
        await ProductUser.update({isActive:false},{where:{
            userId,
            productId
        }})
    }catch(e){
        return res.status(400);
    }

    return res.json({
        message:'Product deleted from wishes list succesfully!'
    })
})


export default router;





