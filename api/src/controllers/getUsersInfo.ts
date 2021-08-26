import { Response, Request } from 'express'
import { User } from '../db'

export default async (req: Request, res: Response) => {

  /**
   * "id": "gitHub|23423kj34234k34k2",
        "userType": "Admin",
        "isActive": true,
        "userName": "Admin",
        "email": "admincrotones@yopmail.com",
   */

  const users=await User.findAll({
    attributes:['id','userType','isActive','userName','email']
  })

  res.json(users)

}


