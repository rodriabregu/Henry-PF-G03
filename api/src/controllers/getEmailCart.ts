import { Response, Request } from 'express'
import sendEmail from '../providers/sendEmail'

/* 
 * Route : GET "api/cart/Emails/:userId"
 * Responde la informacion almacenada en db
 * para un usuario cuyo ID se envia por parametro 
 */

export default async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    await sendEmail(userId, "Card")
    return res.json({
      message: "E-mails send successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
