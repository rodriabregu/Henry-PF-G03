import { Response, Request } from 'express'
import { Sale, SaleItem } from '../db'

/* 
 * Route : GET "api/sale/"
 * Responde con todas las Sales almacenadas en db 
 */

export default async (_req: Request, res: Response) => {

  const sales = await Sale.findAll({
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: [
      {
        model: SaleItem,
        attributes: { exclude: ['updatedAt', 'createdAt'] }
      }
    ]
  })

  if (!sales || sales.length < 1)
    throw {data: [], status: 404, message: "No se encontrason Sales" }

  return res.json({
    message: "successfully",
    data: sales
  })

}
