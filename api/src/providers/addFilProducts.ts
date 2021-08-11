import { readFileSync } from 'fs'
import { appProduct } from '../@app'

import {
  Product, Photo, Brand, Category, ProductCategory
} from '../db'

export default async () => {
  let count = await Product.count()
  if (count > 0) return `they already exist ${count} products in db!`

  const products = await JSON.parse(
    readFileSync(__dirname + `/../lib/${"products"}.json`, 'utf8')
  )
  console.log("prooducts in fil: ", products.length);

  const AddProduct = async (product: any) => {

    const [brand] = await Brand.findOrCreate(
      { where: { name: product.brand.toUpperCase() } }    )

    const brandId = await brand.getDataValue("id")

    const [newPoduct] = await Product.findOrCreate({
      where: { name: product.name },
      defaults: {
        isActive: true,
        name: product.name,
        photo: product.photo,
        brandId,
        price: product.price,
        //category: product.category,
        description: product.name + product.brand + product.category,
        stock: product.name.length
      }
    })
    // const [category] = await Category.findOrCreate({
    //   where: { name: product.category }
    // })
    const productId = await newPoduct.getDataValue("id")
    //const categoryId = await category.getDataValue("id")
    await Photo.findOrCreate({ where: { url: product.photo, productId } })
    //await ProductCategory.findOrCreate({ where: { productId, categoryId } })
    //console.log(`categorias del producto ${productId} ${product.category}`)
    
    //console.log(`Creando ProductCategory con: ${productId} ${product.category}`);

    try{
      for(let i=0; i<product.category.length; i++){
        //console.log(`product: ${productId} categoryId: ${product.category[i]}`)
        await ProductCategory.findOrCreate({where:{productId,categoryId:product.category[i]}})
      }

    }catch(e){
      console.error(e);
    }
  }

  for (let i = 0; i < products.length; i++) {
    await AddProduct(products[i]);
  }

  return `${await Product.count()} products were saved in db!`
}
