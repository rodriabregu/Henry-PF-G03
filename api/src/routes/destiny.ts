import { Router, Request, Response } from 'express';
import { Destiny } from '../db';
import {Sale} from '../db'
const router = Router();


router.post('/',async(req:Request,res:Response)=>{

    const {localAddress,mapAddress,description,fullName,dni,saleId}=req.body;

    let resp=await Destiny.create({
        localAddress,
        mapAddress,
        description,
        fullName,
        dni,
        saleId
    })

    return res.json(resp)
})


router.get('/',async(req:Request,res:Response)=>{


    let destinies=await Destiny.findAll({
        include:{
            model:Sale
        }
    })

    res.json(destinies)

})





export default router;