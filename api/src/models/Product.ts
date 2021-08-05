import {
  Model, DataType, Column, Table, HasMany, BelongsToMany
} from 'sequelize-typescript'

import { Photo } from './Photo';
import { Category } from './Category';
import { ProductCategory } from './ProductCategory';

@Table
export class Product extends Model {

  @Column({ unique: false })
  name!: string;

  @HasMany(() => Photo)
  photos!: Photo[]

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.INTEGER)
  price!: number;

  @Column(DataType.INTEGER)
  stock!: number;

  @Column(DataType.TEXT)
  brand!: string;

  //@Column
  //sport!: string;

  @BelongsToMany(() => Category, () => ProductCategory)
  categories!: Category[];

}
