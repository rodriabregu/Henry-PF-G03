import { Model, Column, Table } from 'sequelize-typescript';
import { HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey } from 'sequelize-typescript'

import { Photo } from './Photo';

@Table
export class Product extends Model<Product> {

  @Column({ unique: true })
  name!: string;

  @HasMany(() => Photo)
  photos!: Photo[]

  @Column
  description!: string;

  @Column
  amount!: string;

  @Column
  stock!: string;

  @Column
  brand!: string;

  @Column
  sportID!: string;

  @Column
  category!: string;

}
