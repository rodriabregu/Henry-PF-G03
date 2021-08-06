import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;
import { appProduct } from '../@app'

export default async function (
  product: appProduct,
  photos?: string[]
): Promise<number> {

  const neWProduct = await Product.findOrCreate({ where: { ...product } })
  const productId = await neWProduct[0].getDataValue('id')

  Photo.findOrCreate({ where: { url: product.photo, productId } })
  if (photos) await Promise.all(photos ? photos.map(photo => {
    return Photo.findOrCreate({ where: { url: photo, productId } })
  }) : [])

  return neWProduct[0].getDataValue('id');

}
