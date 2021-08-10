import {
  Model, Column, Table, DataType, Comment,
  PrimaryKey, AutoIncrement, AllowNull, NotNull,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

import { Sale } from "./Sale"
import { User } from "./User"


@Table
export class Destiny extends Model<Destiny> {

  @Column
  name!: string;

  @Column(DataType.TEXT)
  dato1!: string;

}
