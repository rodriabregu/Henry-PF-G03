import { Router, Request, Response } from 'express';

import { updProduct } from '../providers';

//import { productOptions } from "../@app"

import { Product } from '../db'

const router = Router();

const body = {
  "product": {
    "id": 1,
    "name": " Nuevo pack",
    "price": 45,
    "stock": 15,
//    "photo": "product.photo",
//    "category": 4,
    "description": "zeuscalabria",
    "brand": "NIKE"
  },
  "photos": ["https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg", "photoN"],
  "descriptions": ["description1", "descriptionN"],
  "brand": "brand1",
  "categories": [2, 4]
}

router.put('/', (req: Request, res: Response) => {
  const { id, price, name, stock, description, brand
  } = req.body
  if (!id)
    return res.status(404).json({
      message: " product id not found ",
      data: {}
    })

  return updProduct(id, price, name, stock, description, brand)
    .then((product) => {
      return res.json({
        message: " product updated successfully ",
        data: product
      })
    })
    .catch((error) => {
      return res.status(404).json({
        message: " update failed ",
        error,
        data: {}
      })
    })
})

export default router;
