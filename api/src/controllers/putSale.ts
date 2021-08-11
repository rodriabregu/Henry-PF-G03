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
  const sale = await Sale.findByPk(saleId, { include: "items" })
  if (!(sale && states.includes(newState)))
    throw { status: 404, message: "data is not validate" }

  console.log(sale.get())

  const { state, items } = await sale.get()

  console.log(state, items )

  if( state === "Created" && newState === "Processing")
  if( state === "Created" && newState === "Cancelled")
  if( state === "Processing" && newState === "Cancelled")
  if( state === "Processing" && newState === "Complete")

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

const cancelled = async (saleId: number) => {


  return false

}
