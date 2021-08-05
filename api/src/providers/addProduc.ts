import { sequelize } from '../db';
const { Product, Photo } = sequelize.models;

const addProduct = async function addProduct
(product: {}, photos: {}[]): Promise<any> {

  const neWProduct = await Product.create(product)
  const productId = await neWProduct.getDataValue('id')
  const neWphotos = await Promise.all(photos.map(photo => {
    return Photo.create({ ...photo, productId })
  }))
  return Product.findOne({
    where: { id: productId },
    include: "photos",
  });
}

export default addProduct