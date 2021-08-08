import {
  Model, DataType, Column, Table, ForeignKey,
  HasMany, BelongsToMany,BelongsTo
} from 'sequelize-typescript'

import { Photo } from './Photo';
import { Category } from './Category';
import { ProductsCategory } from './ProductsCategory';
import { Brand } from './Brand';

@Table
export class Product extends Model {

  @Column({ unique: true })
  name!: string;

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

  //@Column
  //sport!: string;

  @BelongsTo(() => Brand)
  brand!: Brand;

  @ForeignKey(() => Brand)
  @Column
  brandId!: number;

  @HasMany(() => Photo)
  photos!: Photo[];

  @BelongsToMany(() => Category, () => ProductsCategory)
  categories!: Category[];

}

