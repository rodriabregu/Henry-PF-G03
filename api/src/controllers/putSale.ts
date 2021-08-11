import { Response, Request } from 'express';
import { error } from "../@app"
import { Product, User, Sale, SaleItem } from '../db';

/* 
 * Route : PUT "api/sale/"
 * Cambia el estado de una Sale segun
 * información enviada por body  
 * 
 *  Ejemplo body
 * 
 * body = {
    "saleId": 1,
    "newState": "Processing"
  }
 */


export default async (req: Request, res: Response) => {
  const { saleId, newState } = req.body
  const states = ['Created', 'Processing', 'Cancelled', 'Complete']
  const sale = await Sale.findByPk(saleId)
  if (!(sale && states.includes(newState)))
    throw { status: 404, message: "data is not validate" }

    console.log(sale.get())

  //setSaleState(saleId, newState)

  return res.json({
    message: "successfully",
    data: "sale"
  })

}

interface appSaleItem {
  saleId: number
  productId: number
  productName: string
  units: number
  salePrice: number
}

const setSaleState = async (saleId: number, state: string) => {


  return false

}
