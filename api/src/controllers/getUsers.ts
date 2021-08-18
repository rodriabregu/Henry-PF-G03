import { Response, Request } from 'express'
import { User, Review, Purchase } from '../db'

/* 
 * Route : GET "api/user/"
 * Responde con todas los usuarios almacenadas en db 
 */

export default async (_req: Request, res: Response) => {
  try {
    
    const users = await User.findAll({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        {
          model: Purchase,
          attributes: ["productId"]
        }
      ]
    })
    
    return res.json({
      message: "successfully",
      data: users
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
