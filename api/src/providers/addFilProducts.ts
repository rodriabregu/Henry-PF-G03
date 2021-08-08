import { readFileSync } from 'fs'
import { appProduct } from '../@app'
import { sequelize } from '../db'
const {
  Product, Photo, Brand, Category, ProductsCategory
} = sequelize.models;

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  const products = await JSON.parse(
    readFileSync(__dirname + `/../lib/${"products"}.json`, 'utf8')
  )
  console.log("prooducts in fil: ", products.length);

  const AddProduct = async (product: appProduct) => {

    const [brand] = await Brand.findOrCreate(
      { where: { name: product.brand.toUpperCase() } }    )

    const brandId = await brand.getDataValue("id")

    const [newPoduct] = await Product.findOrCreate({
      where: { name: product.name },
      defaults: {
        name: product.name,
        photo: product.photo,
        brandId,
        price: product.price,
        category: product.category,
        description: product.name + product.brand + product.category,
        stock: product.name.length
      }
    })
    const [category] = await Category.findOrCreate({
      where: { name: product.category }
    })
    const productId = await newPoduct.getDataValue("id")
    const categoryId = await category.getDataValue("id")
    await Photo.findOrCreate({ where: { url: product.photo, productId } })
    await ProductsCategory.findOrCreate({ where: { productId, categoryId } })

  }

  for (let i = 0; i < products.length; i++) {
    await AddProduct(products[i]);
  }

  return `${await Product.count()} products were saved in db!`
}
