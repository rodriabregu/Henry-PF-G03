import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;
import { appProduct } from '../@app'

export default async function
  (product: appProduct): Promise<any> {
  const { photos } = product
  delete product.photos
  const neWProduct = await Product.findOrCreate({ where: { ...product } })
  const productId = await neWProduct[0].getDataValue('id')
  await Promise.all(photos ? photos.map(photo => {
    return Photo.findOrCreate({ where: { url: photo, productId } })
  }) : [])

  return Product.findOne({
    where: { id: productId },
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: { model: Photo, attributes: ['url'] }
  });
}
