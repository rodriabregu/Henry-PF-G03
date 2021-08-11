import { Response, Request } from 'express';
import { error } from "../@app"
import { Product, User, Sale, SaleItem } from '../db';

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

  await User.create({ userName: "Esteban" }) // quitar esta line cuando user user este implementado y envien datos reales

  const { userId, items } = req.body
  console.log(userId, items)

  if (!(userId && items && Array.isArray(items)))
    return res.status(404).json({
      message: "fallid",
      data: {}
    })

  const saleId = (await Sale.create({
    userId: userId,
    state: 'Created',
    date: new Date(Date.now())
  })).getDataValue("id")

  await Promise.all(items.map(item => {
    return addItem(saleId, item)
  }))

  return res.json({
    message: "successfully",
    data: await Sale.findByPk(saleId, { include: "items" })
  })

}

interface appSaleItem {
  saleId: number
  productId: number
  productName: string
  units: number
  salePrice: number
}

const addItem = async (saleId: number, item: appSaleItem) => {
  const { productId, units } = item
  const product = await Product.findByPk(productId)
  if (product) {
    const stock = product.getDataValue("stock")
    if (stock - units < 0)
      throw { status: 404, message: "no hay stock" }
    //await product.setDataValue("stock", stock - units)
    //await product.save() 
    return SaleItem.create({
      saleId,
      productId,
      productName: product.getDataValue("name"),
      units,
      salePrice: product.getDataValue("price")
    })
  }

}
