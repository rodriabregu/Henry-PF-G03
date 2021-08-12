import {
  Model, Column, Table, HasMany, DataType
} from 'sequelize-typescript';

import { Sale } from './Sale';
import { Review } from './Review';

@Table
export class User extends Model<User> {

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

}
