import { Response, Request } from 'express';
import { Product, Sale, Purchase, SaleItem } from '../db';
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
    if (!newState || !saleId) {
      newState = req.query.status
      const preference_id = req.query.preference_id
      const findSAle = await Sale.findOne({
        where: { preferenceId: preference_id }
      })
      if (!findSAle) throw { status: 404, message: "sale is not" }
      saleId = findSAle.getDataValue("id")
      if (newState === "approved") {
        newState = "Created"
      }
      if (newState === "rejected") newState = "Cancelled"
      if (newState === "pending") newState = "Pending"
    }

    const states = ['Pending', 'Created', 'Processing', 'Complete', 'Cancelled']

    if (!(typeof saleId === "number" && states.includes(newState)))
      throw { status: 404, message: "data is not validate" }

    const sale = await Sale.findByPk(saleId, { include: { model: SaleItem } })
    if (!sale) throw { status: 404, message: "sale is not" }

    const { state, items, userId, id } = sale.get()
    if (state === 'Cancelled') {
      throw { status: 405, message: "sale already is Cancelled" }
    }
    if (state === "Pending" && newState === "Created") {

      await sale.update({ state: "Created" })
      const { items, userId } = await sale.get()

      await Promise.all(items.map(async (item: item) => {

        const { productId, units } = item.get()
        const product = await Product.findByPk(productId)
        if (!product) throw Error("product not found")
        const { stock } = product.get()
        await Purchase.findOrCreate({ where: { userId, productId } })
        await product.update({ stock: stock - units })
        return productId

      }))

      sendEmail(userId, "Created", id)

    } else if (state === "Created" && newState === "Processing") {

      await sale.update({ state: "Processing" })
      sendEmail(userId, "Processing", id)

    } else if (state === "Processing" && newState === "Complete") {

      await sale.update({ state: "Complete" })
      sendEmail(userId, "Complete", id)

    } else if (states.includes(state) && newState === "Cancelled") {

      await Promise.all(items.map(async (item: item) => {
        const { units, productId } = item
        const product = await Product.findByPk(productId)
        if (!product) throw Error("product not found")
        const { stock } = product.get()
        await product.update({ stock: stock + units })
        return productId
      }))
      await sale.update({ state: "Cancelled" })
      sendEmail(userId, "Cancelled", id)

    } else throw { status: 404, message: "actualizacion no permitida" }

    return res.json({
      message: `Sale ${saleId} actualized successfully to ${newState}`,
      data: sale.get()
    })

  } catch (error) {
    console.error(error.message || error)
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
