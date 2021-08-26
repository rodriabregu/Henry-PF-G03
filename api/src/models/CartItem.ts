import {
  ForeignKey, Column, Model, Table, BelongsTo, DataType
} from "sequelize-typescript";
import { Product } from './Product'
import { User } from './User'

@Table
export class CartItem extends Model<CartItem> {

  @ForeignKey(() => User)
  userId!: string  

  @ForeignKey(() => Product)
  productId!: number;
  
  @BelongsTo(() => Product)
  product!: Product;
  
  @Column(DataType.INTEGER)
  units!: number;  
  
}
