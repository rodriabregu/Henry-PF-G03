import {
  DataType, Model, Column, Table,
  PrimaryKey, AutoIncrement, ForeignKey
} from 'sequelize-typescript'

import { Product } from './Product';

@Table
export class Photo extends Model {

  @ForeignKey(() => Product)
  @PrimaryKey
  @AutoIncrement
  @Column
  productId!: number;

  @Column(DataType.TEXT)
  url!: string;

}