import { Response, Request } from 'express'
import { Product, CartItem, User } from '../db'

/* 
 * Route : PUT "/api/cart/:userId"
 * Edita los items del carrito de un determinado
 * usuario especifificado por parametro.
 * recibe los nuevos datos del carrito por body
 */

interface item {
  productId: number
  units: number
}
export default async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.userId)
    const newItems: item[] = req.body.items

    const user = await User.findByPk(userId)
    if (!user) throw { status: 404, message: "user not fund" }


    const items = await CartItem.findAll(
      { where: { userId } }
    )

    await Promise.all(items.map(
      async (item) => item.destroy()
    ))

    await Promise.all(newItems.map(
      (item) => {
        const { productId, units } = item;
        return CartItem.create({ userId, productId, units })
      }
    ))

    return res.json({
      message: "successfully",
      data: { userId, items: newItems }
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
