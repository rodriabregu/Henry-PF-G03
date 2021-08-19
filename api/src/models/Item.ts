import {
  Model, Column, Table, DataType, ForeignKey
} from 'sequelize-typescript'

import { Sale } from './Sale';

@Table
export class Item extends Model<Item> {
  
  @ForeignKey(() => Sale)
  saleId!: number;

  @Column(DataType.INTEGER)
  productId!: number;
  
  @Column(DataType.STRING)
  productName!: string;

  @Column(DataType.INTEGER)
  units!: number;

  @Column(DataType.INTEGER)
  salePrice!: number;

}
