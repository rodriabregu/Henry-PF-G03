import { Response, Request } from 'express'
import { User } from '../db'
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
      hashPasword, firstName
    }: appUser = req.body

    if (!(
      userName && /^([\-\w\.\_]{4,20})$/.test(userName)
      && email
      && /^[a-z][^\s@A-Z]+@[a-z]+\.[a-z]+$/g.test(email)
      && lastName && /[a-z]{5,}/i.test(lastName)
      && firstName && /[a-z]{5,}/i.test(firstName)
      && hashPasword

    ))
      return res.status(404).json({
        data: {},
        status: 404,
        message: "datos no validos"
      });

    const [newUser, isNew] = await User.findOrCreate({
      where: { userName },
      defaults: {
        email, lastName,
        hashPasword, firstName
      }
    })

    if (!isNew) return res.status(404).json({
      status: 404,
      message: `the user ${userName} alreadi exist`
    });

    sendEmail(newUser.get().id, "Welcome")

    return res.json({
      message: `munsage de confirmacion enviado a ${email}`,
      data: newUser.get()
    })
  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
