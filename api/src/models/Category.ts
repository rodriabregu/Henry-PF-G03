import {
  Model, Column, Table, BelongsToMany, ForeignKey, DataType
} from 'sequelize-typescript';

import { CategoryType } from './CategoryType';
import { Product } from './Product'
import { ProductCategory } from './ProductCategory';


@Table
export class Category extends Model {

  @ForeignKey(() => CategoryType)
  categoryTypeId!: number;

  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[]

}
