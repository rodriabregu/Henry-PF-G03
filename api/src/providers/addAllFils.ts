import { readFileSync } from 'fs'
import { appProduct } from '../@app'

import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;

export default async (nameFils: string[]) => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  nameFils.reduce((products, category) => {
    return products.concat(JSON.parse(
      readFileSync(__dirname + `/../lib/${category}.json`, 'utf8')
    ))
  }, [])
    .map((product: appProduct) => {
      Product.findOrCreate({
        where: {
          name: product.name,
          brand: product.brand,
          price: typeof product.price === "string" ?
            parseInt(product.price) : product.price,
          description: product.name + product.brand,
          stock: product.name.length,
          category: product.category
        }
      })
        .then((res) => {
          return Photo.create({
            url: product.photo,
            productId: res[0].getDataValue("id")
          })
        })
    }
    )

  return 'products were saved in db!'
}