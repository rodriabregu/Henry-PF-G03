import { sequelize } from '../db';
const {
  Product, Photo, ProductsCategory
} = sequelize.models;
import { appProduct } from '../@app'

export default async function (
  product: appProduct,
  photos: string[],
  categories: number[]
): Promise<number> {

  const neWProduct = (
    await Product.findOrCreate({ where: { ...product } })
  )[0]
  const productId = await neWProduct.getDataValue('id');

  await Promise.all(photos.map(photo => {
    return Photo.findOrCreate(
      { where: { url: photo, productId } }
    )
  }))
  await Promise.all(categories.map(categoryId =>
    ProductsCategory.findOrCreate(
      { where: { categoryId, productId } }
    )
  ))

  return productId;
}
