import {
  Model, Column, Table, DataType, Comment,
  PrimaryKey, AutoIncrement, AllowNull,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

import { User } from "./User"
import { Product } from "./Product"

@Table
export class Review extends Model<Review> {

  @Column(DataType.TEXT)
  text!: string;

  @Column(DataType.ENUM('1', '2', '3', '4', '5'))
  stars!: number

  @ForeignKey(() => User)
  userId!: number

  @ForeignKey(() => Product)
  ProductId!: number

}
