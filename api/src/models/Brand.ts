import {
  Model, Column, Table
} from 'sequelize-typescript';

@Table
export class Brand extends Model {
  
  @Column
  name!: string;

}
