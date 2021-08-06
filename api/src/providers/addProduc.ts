import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;
import { appProduct } from '../@app'

export default async function (
  product: appProduct,
  photos: string[]
): Promise<number> {

  const neWProduct = await Product.findOrCreate({ where: { ...product } })
  const productId = await neWProduct[0].getDataValue('id')

  await Promise.all(photos.map(photo => {
    return Photo.findOrCreate({ where: { url: photo, productId } })
  }))

  return neWProduct[0].getDataValue('id');

}
