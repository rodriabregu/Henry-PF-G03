import {
  Model, Column, Table, DataType, HasMany, ForeignKey, HasOne
} from 'sequelize-typescript'

import { User } from "./User"
import { Item } from "./Item"
import { Destiny } from "./Destiny"

@Table
export class Sale extends Model<Sale> {

  @Column({
    defaultValue: 'Pending',
    ...DataType.ENUM(
      'Pending', 'Created', 'Processing', 'Cancelled', 'Complete'
    )
  })
  state!: string

  @Column(DataType.DATE)
  date!: Date

  @ForeignKey(() => User)
  userId!: string

  @Column(DataType.STRING)
  purchaseId!: string

  @HasOne(() => Destiny)
  destiny!: Destiny

  @HasMany(() => Item)
  items!: Item[];

}
