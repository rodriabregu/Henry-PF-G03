import {
  Model, DataType, Column, Table, HasMany, BelongsToMany
} from 'sequelize-typescript'

import { Photo } from './Photo';
import { Category } from './Category';
import { ProductsCategory } from './ProductsCategory';

@Table
export class Product extends Model {

  @Column({ unique: false })
  name!: string;

  @Column(DataType.TEXT)
  photo!: string;


  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.INTEGER)
  price!: number;

  @Column(DataType.INTEGER)
  stock!: number;

  @Column(DataType.TEXT)
  brand!: string;

  @Column(DataType.TEXT)
  category!: string;

  //@Column
  //sport!: string;
  
  @HasMany(() => Photo)
  photos!: Photo[]

  @BelongsToMany(() => Category, () => ProductsCategory)
  Categories!: Category[];

}

//Product.belongsToMany(Category, { through: ProductsCategory });

