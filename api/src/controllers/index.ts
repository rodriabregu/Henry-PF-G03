import { Response, Request, Router } from 'express';
import { error } from "../@app"

import postSale from "./postSale"
import putSale from "./putSale"
import getSales from './getSales'
import getSalesUser from './getSalesUser'

const setCatch = (controller: Function) => {
  return async (req: Request, res: Response) => {
    try {
      return await controller(req, res);
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
}
const controllers = (router: Router) => {
  router.post('/sale', setCatch(postSale))
  router.put('/sale', setCatch(putSale))
  router.get('/sales', setCatch(getSales))
  router.get('/sales/user/:userId', setCatch(getSalesUser))
}

export default controllers
