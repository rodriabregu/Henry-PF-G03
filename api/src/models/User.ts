import {
  Model, Column, Table, HasMany, DataType, BelongsToMany
} from 'sequelize-typescript';

import { Sale } from './Sale';
import { Review } from './Review';
//import { Product } from '../db';
import {Product} from './Product'
import ProductUser from './ProductUser';


@Table
export class User extends Model {

  @Column({
    defaultValue: 'user',
    ...DataType.ENUM('Guest', 'User', 'Admin')
  })
  userType!: string;

  @Column({ defaultValue: true })
  isActive!: boolean;

  @Column({ unique: true })
  userName!: string; //userName

  @Column
  email!: string;

  @Column
  hashPasword!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @HasMany(() => Sale)
  sales!: Sale[];

  @HasMany(() => Review)
  reviews!: Review[];

  @BelongsToMany(()=>Product,()=>ProductUser)
  products!:Product[];


}
