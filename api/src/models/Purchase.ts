import {
  ForeignKey, Column, Model, Table, DataType
} from "sequelize-typescript";
import { User } from './User'
import { Product } from './Product'

@Table
export class Purchase extends Model<Purchase>{

  @ForeignKey(() => User)
  userId!: string

  @Column(DataType.INTEGER)
  productId!: number

}
