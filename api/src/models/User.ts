import {
  Model, Column, Table, HasMany, PrimaryKey,
  DataType, BelongsToMany, Unique, AllowNull
} from 'sequelize-typescript';

import { Sale } from './Sale';
import { Review } from './Review';
import { Product } from './Product';
import { Purchase } from './Purchase';
import { CartItem } from './CartItem';

import ProductUser from './ProductUser';

@Table
export class User extends Model {

  @PrimaryKey
  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  id!: string;

  @Column({
    defaultValue: 'Guest',
    ...DataType.ENUM('Guest', 'User', 'Admin')
  })
  userType!: string;

  @Column({ defaultValue: true })
  isActive!: boolean;

  @Column(DataType.STRING)
  userName!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  hashPasword!: string;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @HasMany(() => CartItem)
  cartItems!: CartItem[];

  @HasMany(() => Purchase)
  bought!: Purchase[];

  @HasMany(() => Sale)
  sales!: Sale[];

  @HasMany(() => Review)
  reviews!: Review[];

  @BelongsToMany(() => Product, () => ProductUser)
  products!: Product[];

}
