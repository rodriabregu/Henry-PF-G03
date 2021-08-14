import Router from 'express';
const router = Router();

const mercadopago = require('mercadopago');
import { Request, Response } from "express";

mercadopago.configure({
    access_token: 'TEST-6391722228898188-081219-30abac817348d261414642ced7c8852f-13098495'
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
            unit_price:8
        }
    ]
    let preference = {

        items,
        back_urls:{
            success: "http://localhost:3001/mercadopago",
			failure: "http://localhost:3001/mercadopago",
			pending: "http://localhost:3001/mercadopago"
        }
    };
    mercadopago.preferences.create(preference)
        .then(function (response: any) {
            res.json(response);
        }).catch(function (error: any) {
            console.log(error);
        });

})

router.get('/',(req:Request,res:Response)=>{
    res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	})
})




export default router;