import { Response, Request } from 'express';
import { defaultValueSchemable } from 'sequelize/types/lib/utils';
import { User, Sale, Review, Product } from '../db'
import { error } from '../@app'

/* 
 * Route : POST "/api/user/" 
 * 
 * Creara un nuevo User a partir de la información 
 * enviada por body 
 * 
 *  Ejemplo body
 * 
 * const body = {
    "userName": "string",
    "email": "string@algo.umm",
    "hashPasword": "string",
    "firstName": "string",
    "lastName": "string"
  }
*/

interface user {
  userName: string
  email: string
  hashPasword: string
  firstName: string
  lastName: string
}

export default async (req: Request, res: Response) => {
  try {
    const {
      userName, email, lastName,
      hashPasword, firstName
    }: user = req.body

    console.table({
      userName, email, lastName,
      hashPasword, firstName
    })

    if (!(
      userName && /^([\w\-]{4,20})$/.test(userName) 
      && email
      && /^[a-z][^\s@A-Z]+@[a-z]+\.[a-z]+$/g.test(email)
      && lastName && /[a-z]{5,}/i.test(lastName)
      && hashPasword
      && firstName
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

    return res.json({
      message: "successfully",
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
