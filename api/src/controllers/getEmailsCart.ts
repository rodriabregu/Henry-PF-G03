import { Response, Request } from 'express'
import { User, Purchase } from '../db'

/* 
 * Route : GET "api/cart/Emails/:userId"
 * Responde la informacion almacenada en db
 * para un usuario cuyo ID se envia por parametro 
 */

export default async (req: Request, res: Response) => {
  try {

    const { userId } = req.params

    const user = await User.findByPk(userId, {
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      include: [
        {
          model: Purchase,
          attributes: ["productId"]
        }
      ]
    })

    if (!user) throw { status: 404, message: " user not found" }

    return res.json({
      message: "successfully",
      data: user.get()
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
