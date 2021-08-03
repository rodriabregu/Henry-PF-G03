import {
  Model, Column, Table, DataType,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

import { Product } from './Product';

@Table
export class Photo extends Model<Photo> {

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  })
  id!: number;

  @Column
  url!: string;

  @Column
  alt!: string;

}