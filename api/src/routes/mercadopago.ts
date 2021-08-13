import Router from 'express';
const router = Router();

const mercadopago = require('mercadopago');
import { Request, Response } from "express";

mercadopago.configure({
    access_token: 'TEST-4464086672923304-081215-73061cc2dfa5eaba45a4c8d198b51f32-103105516'
});

router.post('/', (req: Request, res: Response) => {
    /*
    brand: {id: 9, name: "CAPSLAB"}
    categories: [{…}]
    description: "CAPSLAB - Cappellino LOONEYCAPSLAB8"
    id: 20
    name: "CAPSLAB - Cappellino LOONEY"
    photo: [{…}]
    price: 35
    quantity: 1
    stock: 27
    title: "CAPSLAB - Cappellino LOONEY"
    unit_price: 35
    value: {value: 1}    
    */
   /*

    const products=req.body;
    let items;
    products.forEach((p:any)=>{
        const title=p.name;
        const {cuantity}=p;
        const unit_price=p.price;
        items.push({title,cuantity,unit_price})
    })
    */

    let items=[
        {
            title:'Aprobar el PF',
            quantity:1,
            unit_price:1000000
        }
    ]
    let preference = {

        items,
        back_urls:{
            success: "https://www.google.com/",
            failure: "http://www.tu-sitio/failure",
            pending: "http://www.tu-sitio/pending"
        }
    };
    mercadopago.preferences.create(preference)
        .then(function (response: any) {
            res.json(response);
        }).catch(function (error: any) {
            console.log(error);
        });

})




export default router;