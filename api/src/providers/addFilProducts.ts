import { readFileSync } from 'fs'
import { appProduct } from '../@app'
import { sequelize } from '../db'
const {
  Product, Photo, Category, ProductCategory, ProductCategories
} = sequelize.models;

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  await Category.create({ name: "Accesories" })
  await Category.create({ name: "Men" })
  await Category.create({ name: "Women" })
  await Category.create({ name: "Kids" })
  await Category.create({ name: "Undefine" })

  JSON.parse(readFileSync(__dirname + `/../lib/${"products"}.json`, 'utf8'))
    .map(async (product: appProduct) => {

      const NewPoduct = (await Product.findOrCreate({
        where: {
          name: product.name,
          brand: product.brand,
          price: typeof product.price === "string" ?
            parseInt(product.price) : product.price,
          description: product.name + product.brand,
          stock: product.name.length
        }
      }))[0]

      const productId = await NewPoduct.getDataValue("id")
      await Photo.create({ url: product.photo, productId })
      const category = (await Category.findOrCreate({
        where: { name: product.category }
      }))[0]

      const CategoryId = await category.getDataValue("id")

      console.log("pid: ", productId, " cate: ", product.category)
      console.log("id: ", CategoryId, " cate: ", product.category)


      await ProductCategory.findOrCreate({ where: { productId, CategoryId } })
      /*
            await ProductCategories.findOrCreate(
              { where: { productId, CategoryId } }
            )
      */
    })

  return 'products were saved in db!'
}
