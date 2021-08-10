import { appProduct } from '../@app'

import {
  Product, Photo, Brand, ProductCategory
} from '../db';

export default async function (
  product: appProduct,
  photos: string[],
  categories: number[],
): Promise<number> {

  const [brand] = await Brand.findOrCreate(
    { where: { name: product.brand.toUpperCase() } })

  const brandId = await brand.getDataValue("id")

  const [neWProduct] = (
    await Product.findOrCreate({
      where: { name: product.name },
      defaults: { ...product, brandId }
    })
  )

  const productId = await neWProduct.getDataValue('id');

  await Promise.all(photos.map(photo => {
    return Photo.findOrCreate(
      { where: { url: photo, productId } }
    )
  }))
  await Promise.all(categories.map(categoryId =>
    ProductCategory.findOrCreate(
      { where: { categoryId, productId } }
    )
  ))

  return productId;
}
