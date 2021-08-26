import { Response, Request } from 'express'
import { Product, User, Sale, SaleItem } from '../db'
import { mercadoPago } from '../providers'
import { appItem } from '../@app'
/* 
 * Route : POST "api/sale/"
 * Creara una nueva Sale con la 
 * información enviada por body  
 * 
 *  Ejemplo body
 * 
 * body = {
    "userId": 1,
    "purchaseId": "volar",
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
    const { userId, purchaseId, items } = req.body

    if (!(userId && items && Array.isArray(items)))
      return res.status(404).json({
        message: "data is novalidate",
        data: {}
      })

    const user = await User.findByPk(userId)
    if (!user) throw Error(" user not found ")

    const stokItems = await Promise.all(
      items.map(item => { return checkStok(item) })
    )
    if (!(Array.isArray(stokItems) && stokItems.length === items.length))
      throw { status: 404, message: "no Stock" }

    const newSale = await Sale.create({
      purchaseId: purchaseId || "nada",
      userId: userId,
      date: new Date(Date.now())
    })
    if (!newSale) throw { status: 500, message: "sale is not created" }

    const saleId = newSale.getDataValue("id")

    const newItems = await Promise.all(
      items.map(async (item): Promise<appItem> => {
        return (await addItem(item, saleId)).get()
      })
    )
    if (!(Array.isArray(newItems) && newItems.length === items.length)) {
      newSale.destroy()
      throw { status: 500, message: "items is not created" }
    }

    const response = await mercadoPago(user.get(), newItems, saleId)
    if (!response) {
      throw {
        status: 505,
        message: "mercado pago does not respond"
      }
    }

    newSale.update({ 
      url_pago: response.init_point,
      preferenceId: response.id
    })

    return res.json({
      message: "successfully",
      sale: newSale.get(),
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}

const checkStok = async (item: appItem) => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product) throw Error("product not found")
  const { stock } = product.get()
  if (stock - units < 0) throw Error("no stock")
  return stock;
}

const addItem = async (item: appItem, saleId: number): Promise<any> => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product) throw Error("product not found")
  const { price, name } = product.get()
  return await SaleItem.create({
    saleId,
    productId,
    productName: name,
    units,
    salePrice: price
  })
}
