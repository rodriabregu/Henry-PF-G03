import { readFileSync } from 'fs'
import { appProduct } from '../@app'
import { sequelize } from '../db'
const {
  Product, Photo, Category, ProductsCategory
} = sequelize.models;

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  await Category.create({ name: "Accesories" })
  await Category.create({ name: "Men" })
  await Category.create({ name: "Women" })
  await Category.create({ name: "Kids" })

  const products = await JSON.parse(
    readFileSync(__dirname + `/../lib/${"products"}.json`, 'utf8')
  )
  console.log("prooducts in fil: ", products.length);

  const AddProduct = async (product: appProduct) => {
    
    const category = (await Category.findOrCreate({
      where: { name: product.category }
    }))[0]
    
    const NewPoduct = (await Product.findOrCreate({
      where: {
        name: product.name,
        brand: product.brand,
        photo: product.photo,
        price: product.price,
        category: product.category,
        description: product.name + product.brand,
        stock: product.name.length
      }
    }))[0]

    const productId = await NewPoduct.getDataValue("id")
    await Photo.create({ url: product.photo, productId })
    const categoryId = await category.getDataValue("id")
    await ProductsCategory.findOrCreate({ where: { productId, categoryId } })
    
  }
  await Promise.all(
    products.map(AddProduct)
  )
  return `${await Product.count()} products were saved in db!`
}
