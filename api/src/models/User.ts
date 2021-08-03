import { Model, Column, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  name!: string;

  @Column
  lastName!: string;

  @Column
  email!: string;

}