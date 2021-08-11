import { Response, Request } from 'express'
import { Sale, SaleItem } from '../db'

/* 
 * Route : GET "api/sale/user/:userId"
 * Responde con todas las Sales almacenadas en db
 * para un usuario especificado, recibe id por parametro.
 */

export default async (req: Request, res: Response) => {

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
    throw { data: [], status: 404, message: "No se encontrason Sales" }

  return res.json({
    message: "successfully",
    data: sales
  })

}
