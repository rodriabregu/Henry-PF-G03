import { Request, Response } from 'express'
import {
  Product, Brand, ProductCategory, Photo, Category
} from '../db'
import { productOptions } from '../@app'

/**
 * agrega un nuevo producto con los datos recividso por body 
 * 
 * body = {
    "product": {
      "name": " Esteban pack",
      "price": 45,
      "stock": 15,
      "description": "zeuscalabria",
    },
    "photos": ["https://www.zeuscalabria.it/32939-home_default/nike-hairbands-3-pack-bianco-e-nero-njn04983os.jpg", "photoN"],
    "brandId": 3,
    "categories": [2, 4]
 *}
 * 
 */

export default async (req: Request, res: Response) => {
  try {
    let {
      product, photos, categories, brandId
    } = req.body
    product.stock = parseInt(product.stock)
    product.price = parseInt(product.price)

    if (!brandId) {
      const [brand] = await Brand.findOrCreate(
        { where: { name: product.brand.toUpperCase() } })
      brandId = await brand.getDataValue("id")
    }
    brandId = parseInt(brandId)

    if (!(product
      && typeof product.name === "string"
      && product.name.length > 4
      && product.stock > 0
      && product.price > 0
      && brandId > 0
      && Array.isArray(photos)
      && photos.length > 0
      && Array.isArray(categories)
      && categories.length > 0
    )) throw { status: 404, mesage: "data is not validate" }

    const [neWProduct, isNew] = (await Product.findOrCreate({
      where: { name: product.name },
      defaults: { ...product, brandId }
    }))
    if (!isNew) throw {
      status: 404,
      mesage: 'already exist a product to this name'
    }
    const productId = await neWProduct.getDataValue('id');

    await Promise.all(
      photos.map(photo => {
        return Photo.findOrCreate(
          { where: { url: photo, productId } }
        )
      })
    )
    await Promise.all(
      categories.map(categoryId =>
        ProductCategory.findOrCreate(
          { where: { categoryId, productId } }
        )
      )
    )

    /*let dataProduct=await Product.findOne({
      where:{id:productId},
      include:[
        {
          model:Photo,
          as:'photos'
        },
        {
          model:Category,
          as:'categories'
        }        
      ]
    })*/

    let dataProduct=await Product.findByPk(productId,productOptions)
    
    return res.json({
      message: " product saved successfully ",
      data: dataProduct
    })

  } catch (error) {
    console.error(error)
    return res.status(error.status || 500).json({
      message: error.message || "uuups¡¡",
      data: {}
    });
  }
}