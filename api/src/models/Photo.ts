import { Model, Column, Table } from 'sequelize-typescript';
import {HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey} from 'sequelize-typescript'

@Table
export class Photo extends Model<Photo> {
  @Column
  url!: string;

  @Column
  alt!: string;

}