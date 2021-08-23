import { Response, Request } from 'express'
import { User, Purchase } from '../db'
import { appUser } from '../@app'
import { sendEmail } from '../providers'
/* 
 * Route : POST "/api/user/" 
 * 
 * Creara un nuevo User a partir de la información 
 * enviada por body 
 * 
 *  Ejemplo body
 * 
 * const body = {
    "id": "gitHub|23423kj34234k34k2",
    "userName": "J-esteban.345",
    "email": "esteban.345@yopmail.com",
    "firstName": "Juan Esteban",
    "lastName": "Quintero B",
    "hashPasword": "gTw34wNs64ndr75rXr56uVz"
  }
*/

export default async (req: Request, res: Response) => {
  try {
    const {
      userName, email, lastName,
      hashPasword, firstName, id
    }: appUser = req.body

    if (!(
      id && typeof id === 'string' && id.length > 6
      //&& userName && /^([\-\w\.\_]{4,20})$/.test(userName)
      //&& /^[a-z][^\s@A-Z]+@[a-z]+\.[a-z]+$/g.test(email)
      //&& lastName && /[a-z]{5,}/i.test(lastName)
      //&& firstName && /[a-z]{5,}/i.test(firstName)
      //&& hashPasword && email
    ))
      throw {
        status: 404,
        message: "data is not validate"
      }

    const [newUser, isNew] = await User.findOrCreate({
      where: { id },
      defaults: {
        email: email || "user.crotones@yopmail.com",
        lastName: lastName || "user crotones",
        userName: userName || "user crotones",
        hashPasword: hashPasword || "user crotones",
        firstName: firstName || "user crotones",
      },
      include: [
        {
          model: Purchase,
          attributes: ["productId"]
        }
      ]
    })
    /* 
        if (!isNew) return res.status(404).json({
          status: 404,
          message: `the user ${userName} alreadi exist`
        });
     */
    if (isNew) sendEmail(newUser.get().id, "Welcome")

    return res.json({
      message: 'successfully',
      isNew,
      user: newUser.get()
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
