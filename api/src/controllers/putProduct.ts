import { Request, Response } from 'express';

import { Product, ProductCategory } from '../db'
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
  "brand": 3,
  "categories": [2, 4]
}
*/

export default async (req: Request, res: Response) => {
  try {

    let {
      id, price, name, stock, description, categories
    } = req.body

    categories = categories.map((category: any) => category.id)
    const producId: number = parseInt(id)
    const product = await Product.findByPk(producId)
    if (!product) throw { status: 404, message: "product not fund" }
    const productId = product.getDataValue('id')
    await product.update({
      name, price, stock, description
    })

    const relations = await ProductCategory.findAll(
      { where: { productId } }
    )

    await Promise.all(relations.map(
      async (relation) => {
        if (!categories.includes(relation.getDataValue('categoryId')))
          return relation.destroy()
      }
    ))

    await Promise.all(categories.map(
      (categoryId: number) =>
        ProductCategory.findOrCreate(
          { where: { categoryId, productId } }
        )
    ))

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
