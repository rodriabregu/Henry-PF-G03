import {
  Model, DataType, Column, Table, ForeignKey,
  HasMany, BelongsToMany, BelongsTo,
} from 'sequelize-typescript'

import { Photo } from './Photo';
import { Category } from './Category';
import { ProductCategory } from './ProductCategory';
import { Brand } from './Brand';

@Table
export class Product extends Model {

  @Column({ unique: true })
  name!: string;

  @Column
  isActive!: boolean;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.INTEGER)
  price!: number;

  @Column(DataType.INTEGER)
  stock!: number;

  @Column
  photo!: string;

  @Column
  category!: string;

  @BelongsTo(() => Brand)
  brand!: Brand;

  @ForeignKey(() => Brand)
  brandId!: number;

  @HasMany(() => Photo)
  photos!: Photo[];

  @BelongsToMany(() => Category, () => ProductCategory)
  categories!: Category[];

}

