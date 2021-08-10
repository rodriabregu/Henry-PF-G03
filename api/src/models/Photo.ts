import {
  DataType, Model, Column, Table, ForeignKey
} from 'sequelize-typescript'

import { Product } from './Product';

@Table
export class Photo extends Model {

  @ForeignKey(() => Product)
  productId!: number;

  @Column(DataType.TEXT)
  url!: string;

}