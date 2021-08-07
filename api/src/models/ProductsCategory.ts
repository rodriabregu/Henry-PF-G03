import {
  Model, Column, Table, ForeignKey
} from 'sequelize-typescript';
import { Product } from './Product'
import { Category } from './Category'

@Table
export class ProductsCategory extends Model {

  @ForeignKey(() => Product)
  @Column
  productId!: number;

  @ForeignKey(() => Category)
  @Column
  categoryId!: number;

}
