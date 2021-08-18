import { Response, Request } from 'express'
import { Sale, Item } from '../db'

/* 
 * Route : GET "api/sale/"
 * Responde con todas las Sales almacenadas en db 
 */

export default async (_req: Request, res: Response) => {
  try {
    const sales = await Sale.findAll({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        {
          model: Item,
          attributes: { exclude: ['updatedAt', 'createdAt'] }
        }
      ]
    })

    if (!sales || sales.length < 1)
      throw Error("No se encontrason Sales")

    return res.json({
      message: "successfully",
      data: sales
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
