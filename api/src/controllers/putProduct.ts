import { Request, Response } from 'express';

import { Product, Brand } from '../db'
/*
const body = {
  "product": {
    "id": 1,
    "name": " Nuevo pack",
    "price": 45,
    "stock": 15,
    "description": "zeuscalabria",
  },
  "photos": ["https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg", "photoN"],
  "descriptions": ["description1", "descriptionN"],
  "brand": 3,
  "categories": [2, 4]
}
*/

export default async (req: Request, res: Response) => {
  try {

    const {
      id, price, name, stock, description
    } = req.body

    if (!id)
      return res.status(404).json({
        message: " product id not found ",
        data: {}
      })

    const product = await Product.findByPk(id)
    if (!product) throw { status: 404, message: "product not fund" }

    await product.update({
      name, price, stock, description
    })

    return res.json({
      message: "pruduct update successfully",
      data: product.get()
    });

  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
