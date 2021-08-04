import { Model, Column, Table, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { CategoryType } from './CategoryType';
import { Product } from './Product'
import { ProductCategory } from './ProductCategory';

@Table
export class Category extends Model {

  @Column
  descritpion!: string;

  @BelongsToMany(() => Product, () => ProductCategory)
  products!: Product[]

}
