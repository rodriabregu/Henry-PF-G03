import {
  Model, Column, Table, DataType, Comment,
  PrimaryKey, AutoIncrement, AllowNull, NotNull,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

import { Sale } from "./Sale"
import { User } from "./User"


@Table
export class Destiny extends Model {

  @Column
  localAddress!: string;

  @Column
  mapAddress!: string;

  @Column
  description!:string;

  @Column
  fullName!:string

  @Column
  dni!:string

  @ForeignKey(()=>Sale)
  saleId!:number

  @BelongsTo(()=>Sale)
  sale!:Sale

}
