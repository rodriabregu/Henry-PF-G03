import { readFileSync } from 'fs'
import { appProduct } from '../@app'
import addProduct from './addProduc'
import { sequelize } from '../db';

const { Product } = sequelize.models;

export default async () => {
  let count = await Product.count()
  if( count > 0 ) return `hay ${count} productos en db`

  JSON.parse(
    readFileSync(__dirname + '/../lib/accesories.json', 'utf8')
  ).map((current: appProduct, idx: number, array: appProduct[],
  ) => {
    if (idx < array.length - 1 && current.name === array[idx + 1].name)
    //if (idx >= 1 && current.name === every[idx + 1].name) 
    {
      array[idx + 1].photos.push(current.photos[0])
    } else {

      addProduct({
        name: current.name,
        photos: [current.photos[0]],
        brand: current.brand,
        price: typeof current.price === "string" ?
          parseInt(current.price) : current.price,
        description: current.name + current.brand,
        stock: Math.floor(Math.random() * 9 + 12),
      })

    }
  })

  return `se agregaron los productos en db`
}