import { readFileSync } from 'fs'
import { appProduct } from '../@app'
import { sequelize } from '../db'
const {
  Product, Photo, Category, ProductsCategory, ProductsCategories
} = sequelize.models;

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  await Category.create({ name: "Accesories" })
  await Category.create({ name: "Men" })
  await Category.create({ name: "Women" })
  await Category.create({ name: "Kids" })
  await Category.create({ name: "Undefine" })
  await Category.create({ name: "Hombre" })

  const products = await JSON.parse(
    readFileSync(__dirname + `/../lib/${"products"}.json`, 'utf8')
  )
  console.log("pro: ", products.length)

  const AddProduct = async (product: appProduct) => {
    const NewPoduct = (await Product.findOrCreate({
      where: {
        name: product.name,
        brand: product.brand,
        price: product.price,
        description: product.name + product.brand,
        stock: product.name.length
      }
    }))[0]
    
    const ProductId = await NewPoduct.getDataValue("id")
    await Photo.create({ url: product.photo, ProductId })
    const category = (await Category.findOrCreate({
      where: { name: product.category }
    }))[0]

    const CategoryId = await category.getDataValue("id")

    console.log("productId: ", ProductId, "categorId: ", CategoryId, " cate: ", product.category)
    
    await ProductsCategory.findOrCreate({ where: { ProductId, CategoryId } })
    /*
          await ProductCategories.findOrCreate(
            { where: { productId, CategoryId } }
          )
    */
  }



  await Promise.all(
    products.map(AddProduct)
  )
  return 'products were saved in db!'
}
