import { Request, Response } from 'express';
import { productOptions } from '../@app'
import { Product } from '../db'

/**
 * responde con el detalle de un producto
 * cuyo id es rescibido por parametro
 * phat GET /api/product/:productId
 */

export default async (req: Request, res: Response) => {
  try {
    const { producId } = req.params
    const product = await Product.findByPk(producId, productOptions);
    if (!product) throw { status: 505, mesage: 'product no fund' }

    return res.json({
      message: "successfully ",
      product: product.get()
    })

  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}
