import { Model, Column, Table } from 'sequelize-typescript';
import {HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey} from 'sequelize-typescript'

@Table
export class Modelx extends Model<Modelx> {
  @Column
  name!: string;
}