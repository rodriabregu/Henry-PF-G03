import { Response, Request } from 'express';
import router from '../routes'
import { error } from "../@app"

import postSaleF from "./postSale"
import putSale from "./putSale"


const controllersCatch = (controller: Function) => {
  return async (req: Request, res: Response) => {
    try {
      return await controller(req, res);
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
}
const postSale = controllersCatch(postSaleF)
//const putSale = controllersCatch(putSale)

router.put('/sale',controllersCatch(putSale))
export {
  postSale,
  //putSale
}