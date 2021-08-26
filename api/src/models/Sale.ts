import {
  Model, Column, Table, DataType, HasMany, ForeignKey, HasOne
} from 'sequelize-typescript'

import { User } from "./User"
import { SaleItem } from "./SaleItem"
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

  @Column(DataType.STRING)
  url_pago!: string

  @Column(DataType.STRING)
  preferenceId!: string

  @Column(DataType.STRING)
  purchaseId!: string

  @Column(DataType.DATE)
  date!: Date

  @ForeignKey(() => User)
  userId!: string

  @HasOne(() => Destiny)
  destiny!: Destiny

  @HasMany(() => SaleItem)
  items!: SaleItem[];

}
