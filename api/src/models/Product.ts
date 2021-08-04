import {
  Model, DataType, Column, Table, HasMany, BelongsToMany
} from 'sequelize-typescript'

import { Photo } from './Photo';
import { Category } from './Category';
import { ProductCategory } from './ProductCategory';

@Table
export class Product extends Model {

  @Column({ unique: true })
  name!: string;

  @HasMany(() => Photo)
  photos!: Photo[]

  @Column
  description!: string;

  @Column(DataType.INTEGER)
  price!: number;

  @Column(DataType.INTEGER)
  stock!: number;

  @Column
  brand!: string;

  @Column
  sport!: string;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories!: Category[];

}
