import {
  Model, Column, Table, DataType, ForeignKey
} from 'sequelize-typescript'

import { Sale } from './Sale';
import { Cart } from './Cart';

@Table
export class Item extends Model<Item> {
  
  @ForeignKey(() => Sale)
  saleId!: number;

  @ForeignKey(() => Cart)
  cartId!: number;

  @Column(DataType.INTEGER)
  productId!: number;
  
  @Column
  productName!: string;

  @Column(DataType.INTEGER)
  units!: number;

  @Column(DataType.INTEGER)
  salePrice!: number;

}
