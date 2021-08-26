import {
  Model, Column, Table, DataType, ForeignKey
} from 'sequelize-typescript'

import { User } from "./User"
import { Product } from "./Product"

@Table
export class Review extends Model {

  @Column(DataType.TEXT)
  text!: string;

  @Column(DataType.ENUM('1', '2', '3', '4', '5'))
  stars!: number

  @ForeignKey(() => User)
  userId!: string

  @ForeignKey(() => Product)
  ProductId!: number

}
