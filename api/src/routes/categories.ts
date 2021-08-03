import {Router,Request,Response} from 'express';
const router=Router();


router.get('/',(req:Request,res:Response)=>{
    res.send('estoy en categorias')
})


router.post('/',(req:Request,res:Response)=>{
    res.send('creando una categoria')
})



export default router;
