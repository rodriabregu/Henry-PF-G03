import { Model, Column, Table, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class CategoryType extends Model{
  
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number;

  @Column
  description!: string;

}
