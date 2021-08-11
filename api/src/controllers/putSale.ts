import { Response, Request } from 'express';
import { Product, Sale } from '../db';

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

  const { state, items } = await sale.get()

  if (state === "Created" && newState === "Processing") {

    await sale.update({ state: "Processing" })
    if (sale.get().state !== "Processing")
      throw { status: 404, message: "no actualizo a Processing" }

  } else if (state === "Created" && newState === "Cancelled") {

    await Promise.all(items.map((item: item) => {
      return deleteItem(item)
    }))
    await sale.update({ state: "Cancelled" })
    if (sale.get().state !== "Cancelled")
      throw { status: 505, message: "no actualizo a Cancelled" }

  } else if (state === "Processing" && newState === "Cancelled") {

    await Promise.all(items.map((item: item) => {
      return deleteItem(item)
    }))
    console.log("Cancelled: ", sale.get())
    await sale.update({ state: "Cancelled" })
    if (sale.get().state !== "Cancelled")
      throw { status: 505, message: "no actualizo a Cancelled" }

  } else if (state === "Processing" && newState === "Complete") {

    await sale.update({ state: "Complete" })
    if (sale.get().state !== "Complete")
      throw { status: 505, message: "no actualizo a Complete" }

  } else throw { status: 404, message: "actualizacion no permitida" }

  return res.json({
    message: "successfully",
    data: sale.get()
  })
}

interface item {
  update: Function
  productId: number
  units: number
}

const deleteItem = async (item: item) => {

  const { units, productId } = item
  const product = await Product.findByPk(productId)
  if (!product)
    throw { status: 404, message: "producto no existe" }
  const { stock } = product.get()
  return product.update({ stock: stock + units })

}