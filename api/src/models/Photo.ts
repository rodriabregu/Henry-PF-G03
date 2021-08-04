import {
  Model, Column, Table, PrimaryKey,
  AutoIncrement, ForeignKey
} from 'sequelize-typescript'

import { Product } from './Product';

@Table
export class Photo extends Model {

  @ForeignKey(() => Product)
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  url!: string;

  @Column
  alt!: string;

}