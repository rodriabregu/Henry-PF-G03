import {
  Model, Column, Table, PrimaryKey, AutoIncrement
} from 'sequelize-typescript';

@Table
export class Brand extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  description!: string;

}
