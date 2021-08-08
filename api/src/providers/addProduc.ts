import { sequelize } from '../db';
const {
  Product, Photo, ProductsCategory, Brand
} = sequelize.models;
import { appProduct } from '../@app'

export default async function (
  product: appProduct,
  photos: string[],
  categories: number[],
): Promise<number> {

  const [brand] = await Brand.findOrCreate(
    { where: { name: product.brand.toUpperCase() } })

  const brandId = await brand.getDataValue("id")

  const neWProduct = (
    await Product.findOrCreate({
      where: { name: product.name },
      defaults: { ...product, brandId }
    })
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
