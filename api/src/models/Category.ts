import {
  Model, Column, Table, BelongsToMany, ForeignKey
} from 'sequelize-typescript';

import { CategoryType } from './CategoryType';
import { Product } from './Product'
import { ProductCategory } from './ProductCategory';


@Table
export class Category extends Model {

  @ForeignKey(() => CategoryType)
  categoryTypeId!: number;

  @Column
  name!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[]

}
