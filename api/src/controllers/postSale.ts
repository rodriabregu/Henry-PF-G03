import { Response, Request } from 'express'
import { Product, User, Sale, SaleItem } from '../db'
import { sendEmail, mercadoPago } from '../providers'
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

    if (!(purchaseId && userId && items && Array.isArray(items)))
      return res.status(404).json({
        message: "dotos no validos",
        data: {}
      })

    const user = await User.findByPk(userId)
    if (!user) throw Error(" usuario no encontrado ")

    const stokItems = await Promise.all(items.map(item => {
      return checkStok(item)
    }))
    if (!Array.isArray(stokItems))
      throw Error("no hay stoy")

    const newSale = await Sale.create({
      purchaseId,
      userId: userId,
      date: new Date(Date.now())
    })
    if (!newSale) throw Error("no se creo la sale")

    const saleId = newSale.getDataValue("id")

    const newItems = await Promise.all(items.map(
      async (item): Promise<appItem> => {
        return (await addItem(item, saleId)).get()
      }
    ))
    if (!Array.isArray(newItems)) {
      newSale.destroy()
      throw Error("no se crearon los items")
    }

    const response = await mercadoPago(user.get(), newItems, saleId)
    if (!response) throw Error("mercado pago no responde")
    sendEmail(user.get().id, "Created", saleId)

    return res.json({
      message: "successfully",
      data: {
        sale: newSale.get(),
        response
      }
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
  if (!product) throw Error("producto no existe")
  const { stock } = product.get()
  if (stock - units < 0) throw Error("no hay stock")
  return stock;
}

const addItem = async (item: appItem, saleId: number): Promise<any> => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (!product) throw Error("producto no existe")
  const { stock, price, name } = product.get()
  await product.update({ stock: stock - units })

  return await SaleItem.create({
    saleId,
    productId,
    productName: name,
    units,
    salePrice: price
  })
}
