import { Response, Request } from 'express'
import { Product, User, Sale, SaleItem } from '../db'

/* 
 * Route : POST "api/sale/"
 * Creara una nueva Sale con la 
 * información enviada por body  
 * 
 *  Ejemplo body
 * 
 * body = {
    "userId": 1,
    "items": [
      {
        "productId": 34,
        "units": 2
      }
    ]
  }
 */

export default async (req: Request, res: Response) => {

  await User.create({ userName: "Esteban " }) // quitar esta line cuando user user este implementado y envien datos reales

  const { userId, items } = req.body

  if (!(userId && items && Array.isArray(items)))
    return res.status(404).json({
      message: "fallid",
      data: {}
    })

  await Promise.all(items.map(item => {
    return checkStok(item)
  }))

  const saleId = (await Sale.create({
    userId: userId,
    state: 'Created',
    date: new Date(Date.now())
  })).getDataValue("id")

  await Promise.all(items.map(item => {
    return addItem(item, saleId)
  }))

  const sale = await Sale.findByPk(saleId, { include: "items" })
  if(!sale) throw { status: 404, message: "no se creo la sale" }

  return res.json({
    message: "successfully",
    data: sale.get()
  })

}

interface item {
  productId: number
  units: number
}

const checkStok = async (item: item) => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product)
    throw { status: 404, message: "producto no existe" }
  const { stock } = product.get()
  if (stock - units < 0)
    throw { status: 404, message: "no hay stock" }
  return true;
}

const addItem = async (item: item, saleId: number) => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product)
    throw { status: 404, message: "producto no existe" }
  const { stock, price, name } = product.get()
  await product.update({ stock: stock - units })

  return SaleItem.create({
    saleId,
    productId,
    productName: name,
    units,
    salePrice: price
  })
}
