import { Response, Request } from 'express'
import { CartItem } from '../db'

/* 
 * Route : GET "/api/cart/:userId"
 * Responde con todos los items de carrito para un
 * determinado usuario especifificado por parametro
 */

export default async (req: Request, res: Response) => {
  try {

    const { userId } = req.params

    const items = await CartItem.findAll({
      where: { userId },
      attributes: { exclude: ['updatedAt', 'createdAt'] },      
    })

    return res.json({
      message: "successfully",
      data: { userId, items }
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
