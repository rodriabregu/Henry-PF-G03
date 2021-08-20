import {
  Model, Column, Table, DataType
} from 'sequelize-typescript';

@Table
export class Brand extends Model {
  
  @Column(DataType.STRING)
  name!: string;

}
