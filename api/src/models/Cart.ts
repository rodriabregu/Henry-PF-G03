import {
  Model, Table, HasMany, ForeignKey
} from 'sequelize-typescript'

import { User } from "./User"
import { Item } from "./Item"

@Table
export class Cart extends Model<Cart> {

  @ForeignKey(() => User)
  userId!: number

  @HasMany(() => Item)
  items!: Item[];

}
