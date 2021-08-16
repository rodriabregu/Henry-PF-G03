import { Response, Request } from 'express';
import { Product, Sale } from '../db';
import { sendEmail } from '../providers'
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
  try {
    let { saleId, newState } = req.body
    saleId = parseInt(saleId);
    if (!newState) {
      newState = req.query.status
      if (newState === "approved") newState = "Created"
      else if (newState === "rejected") newState = "Cancelled"
      else newState = "Cancelled"
    }

    const states = ['Pending', 'Created', 'Processing', 'Complete', 'Cancelled']

    if (!(typeof saleId === "number" && states.includes(newState)))
      throw { status: 404, message: "data is not validate" }

    const sale = await Sale.findByPk(saleId, { include: "items" })
    if (!sale) throw { status: 404, message: "sale is not" }

    const { state, items, userId, id } = sale.get()
    if (state === 'Cancelled') {
      throw { status: 405, message: "sale already is Cancelled" }
    } else if (state === "Pending" && newState === "Created") {

      await sale.update({ state: "Created" })
      const { items } = await sale.get()
      await Promise.all(items.map((item: item) => {
        const { productId, units } = item.get()
        lowerStock(productId, units)
      }))
      sendEmail(userId, "Created", id)

    } else if (state === "Created" && newState === "Processing") {

      await sale.update({ state: "Processing" })
      sendEmail(userId, "Processing", id)

    } else if (state === "Processing" && newState === "Complete") {

      await sale.update({ state: "Complete" })
      sendEmail(userId, "Complete", id)

    } else if (states.includes(state) && newState === "Cancelled") {

      await Promise.all(items.map((item: item) => {
        return deleteItem(item)
      }))
      await sale.update({ state: "Cancelled" })
      sendEmail(userId, "Cancelled", id)

    } else throw { status: 404, message: "actualizacion no permitida" }

    return res.json({
      message: `Sale ${saleId} actualized successfully to ${newState}`,
      data: sale.get()
    })

  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}

interface item {
  get: Function
  update: Function
  productId: number
  units: number
}

const deleteItem = async (item: item) => {

  const { units, productId } = item
  const product = await Product.findByPk(productId)
  if (!product) throw Error("product not found")
  const { stock } = product.get()
  return product.update({ stock: stock + units })

}

const lowerStock = async (productId: number, units: number): Promise<any> => {

  const product = await Product.findByPk(productId)
  if (!product) throw Error("product not found")
  const { stock } = product.get()
  return product.update({ stock: stock - units })

}