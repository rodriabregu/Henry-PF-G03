import { Response, Request } from 'express'
import { User } from '../db'

export default async (req: Request, res: Response) => {

    const { isActive, id } = req.body;

    await User.update(
        { isActive: isActive},
        { where: { id: id } }
    ).then(resp=>{
        if(resp[0]===1){
            return res.json(`User ${id} deleted successfully`)
        }else{
            return res.status(404).json(`An error occurred. Probably id ${id} does not exsit on DB`)
        }
    }).catch(err=>{
        return res.status(500).json(`An internal error occurred. Log:${err}`)
    })

}

