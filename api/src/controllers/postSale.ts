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
  try {
    const { userId, items } = req.body

    if (!(userId && items && Array.isArray(items)))
      return res.status(404).json({
        message: "fallid",
        data: {}
      })

    const user = await User.findByPk(userId)
    if (!user) throw Error(" usuario no encontrado ")

    const stokItems = await Promise.all(items.map(item => {
      return checkStok(item)
    }))
    if (!Array.isArray(stokItems))
      throw Error("no hay stoy")

    const saleId = (await Sale.create({
      userId: userId,
      date: new Date(Date.now())
    })).getDataValue("id")

    const newItems = await Promise.all(items.map(
      item => { return addItem(item, saleId) }
    ))
    if (!Array.isArray(newItems))
      throw Error("no se crearon los items")

    const sale = await Sale.findByPk(saleId, { include: "items" })
    if (!sale) throw Error("no se creo la sale")

    return res.json({
      message: "successfully",
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
  productId: number
  units: number
}

const checkStok = async (item: item) => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product) throw Error("producto no existe")
  const { stock } = product.get()
  if (stock - units < 0) throw Error("no hay stock")
  return stock;
}

const addItem = async (item: item, saleId: number) => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product) throw Error("producto no existe")
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
