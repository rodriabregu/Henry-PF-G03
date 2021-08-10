import {
  Model, Column, Table, DataType, Comment,
  PrimaryKey, AutoIncrement, AllowNull, NotNull,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

import { Product } from "./Product"
import { User } from "./User"
import { Photo } from './Photo';
import { Category } from './Category';
import { ProductCategory } from './ProductCategory';
import { Brand } from './Brand';


@Table
export class Destiny extends Model<Destiny> {

  @Column
  name!: string;

  @Column(DataType.TEXT)
  dato1!: string;

}
