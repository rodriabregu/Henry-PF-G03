import { Model, Column, Table, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Product } from './Product'
import { ProductCategory } from './ProductCategory';


@Table
export class Category extends Model {

  @Column
  description!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[]

}
