import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;
import { appProduct } from '../@app'

export default async function
  (product: appProduct): Promise<any> {

  const neWProduct = await Product.create(product)
  const productId = await neWProduct.getDataValue('id')
  await Promise.all(product.photos.map(photo => {
    return Photo.create({ url: photo, productId })
  }))
  
  return Product.findOne({
    where: { id: productId },
    attributes: { exclude: ['updatedAt', 'createdAt'] },
    include: {
      model: Photo,
      attributes: ['url']
    }
  });
}
