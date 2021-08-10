import {
  Model, Column, Table, DataType, Comment,
  PrimaryKey, AutoIncrement, AllowNull,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript';

import { Sale } from './Sale';

@Table
export class User extends Model<User> {

  @Column
  nickNane!: string; //userName

  @Column
  email!: string;

  @Column
  hashPasword!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;
  
  @HasMany(() => Sale)
  Sales!: Sale[];

}
