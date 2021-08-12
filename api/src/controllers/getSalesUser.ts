import { Response, Request } from 'express'
import { Sale, SaleItem } from '../db'

/* 
 * Route : GET "api/sale/user/:userId"
 * Responde con todas las Sales almacenadas en db
 * para un usuario especificado, recibe id por parametro.
 */

export default async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const sales = await Sale.findAll({
      where: { userId },
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        {
          model: SaleItem,
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
