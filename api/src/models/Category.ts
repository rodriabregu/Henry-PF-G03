import {
  Model, Column, Table, BelongsToMany
} from 'sequelize-typescript';
import { Product } from './Product'
import { ProductsCategory } from './ProductsCategory';


@Table
export class Category extends Model {

  @Column
  name!: string;

  @BelongsToMany(() => Product, () => ProductsCategory)
  products!: Product[]

}
