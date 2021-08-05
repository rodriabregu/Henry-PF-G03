import { readFileSync } from 'fs'
import { appProduct } from '../@app'

import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  JSON.parse(
    readFileSync(__dirname + '/../lib/accesories.json', 'utf8')
  ).map((product: appProduct) => {

    Product.findOrCreate({
      where: {
        name: product.name,
        brand: product.brand,
        price: typeof product.price === "string" ?
          parseInt(product.price) : product.price,
        description: product.name + product.brand,
        stock: product.name.length
      }
    })
      .then((res) => {
        return Photo.create({
          url: product.photos[0]
        })
      })
  }
  )

  return 'products were saved in db!'
}