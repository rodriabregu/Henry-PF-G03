import Router from 'express';
const router = Router();

const mercadopago = require('mercadopago');
import { Request, Response } from "express";

mercadopago.configure({
    access_token: 'TEST-4464086672923304-081215-73061cc2dfa5eaba45a4c8d198b51f32-103105516'
});

router.post('/', (req: Request, res: Response) => {

    //const products=req.body;

    let preference = {
        items: [
            {
                title: 'Mi producto',
                unit_price: 100,
                quantity: 1,
            }
        ]
    };

    mercadopago.preferences.create(preference)
        .then(function (response: any) {
            res.json(response);
        }).catch(function (error: any) {
            console.log(error);
        });

})




export default router;