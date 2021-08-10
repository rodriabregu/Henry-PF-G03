import { error } from "../@app"

import postSaleF from "./postSale"

import { Response, Request, NextFunction } from 'express';

const controllersCatch = (controller: Function) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await controller(req, res, next);
    } catch (err) {
      return res.status(err.status).json(err);
    }
  }
}
const postSale = controllersCatch(postSaleF)

export {
  postSale
}