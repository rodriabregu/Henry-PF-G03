import {
  Model, Table, ForeignKey
} from 'sequelize-typescript';

import { Product } from './Product'
import { Category } from './Category'

@Table
export class ProductCategory extends Model {

  @ForeignKey(() => Product)
  productId!: number;

  @ForeignKey(() => Category)
  categoryId!: number;

}
