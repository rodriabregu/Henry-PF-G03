import {
  Model, DataType, Column, Table, ForeignKey,
  HasMany, BelongsToMany, BelongsTo,
} from 'sequelize-typescript'

import { Photo } from './Photo';
import { Category } from './Category';
import { ProductCategory } from './ProductCategory';
import { Brand } from './Brand';
import {Review} from './Review'

@Table
export class Product extends Model {

  @Column({ unique: true })
  name!: string;

  @Column({defaultValue: true})
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

  @HasMany(()=>Review)
  reviews!:Review[]

  @BelongsToMany(() => Category, () => ProductCategory)
  categories!: Category[];

}

