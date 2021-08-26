import { Router, Request, Response } from 'express';

import { productOptions } from "../@app"
import { Op } from 'sequelize'
import { Product } from '../db'

export default (_req: Request, res: Response) => {
  return Product
    .findAll({
      ...productOptions,
      where: {
        stock: {
          [Op.gt]: 0
        },
        isActive: true
      }
    })
    .then((products) => {
      return res.json({
        message: 'Success',
        data: products
      })
    })
}
