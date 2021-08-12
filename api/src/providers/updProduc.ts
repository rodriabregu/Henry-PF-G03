import appUpdProduct from '../@app/appUpdProduct';

import { Product } from '../db';

export default async function (
  id: number,
  price: number, 
  name: string, 
  stock: number, 
  description: string, 
  brand: string,
): Promise<any> {
  const updProductFound = await Product.findByPk(id)

  const updProductResult = await Product.update({
    name, price, stock, description, brand }, 
  { where: { id }})
  return updProductResult;
}
