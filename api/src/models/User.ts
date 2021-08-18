import {
  Model, Column, Table, HasMany, DataType, BelongsToMany
} from 'sequelize-typescript';

import { Sale } from './Sale';
import { Review } from './Review';
import { Product } from './Product';
import { Purchase } from './Purchase'

import ProductUser from './ProductUser';

@Table
export class User extends Model {

  @Column({
    defaultValue: 'Guest',
    ...DataType.ENUM('Guest', 'User', 'Admin')
  })
  userType!: string;

  @Column({ defaultValue: true })
  isActive!: boolean;

  @Column({ unique: true })
  userName!: string;

  @Column({ unique: true })
  email!: string;

  @Column
  hashPasword!: string;

  @Column
  firstName!: string;

  @Column
  lastName!: string;

  @HasMany(() => Purchase)
  bought!: Purchase[]; 

  @HasMany(() => Sale)
  sales!: Sale[];

  @HasMany(() => Review)
  reviews!: Review[];

  @BelongsToMany(() => Product, () => ProductUser)
  products!: Product[];

}
