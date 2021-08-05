import {
  DataType, Model, Column, Table,
  PrimaryKey, AutoIncrement, ForeignKey
} from 'sequelize-typescript'

import { Product } from './Product';

@Table
export class Photo extends Model {

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId!: number;

  @Column(DataType.TEXT)
  url!: string;

}