import { readFileSync } from 'fs'
import { appProduct } from '../@app'

import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  JSON.parse(readFileSync(__dirname + `/../lib/${"products"}.json`, 'utf8'))
    .map((product: appProduct) => {
      Product.findOrCreate({
        where: {
          name: product.name,
          photo: product.photo,
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