import {
  Model, Column, Table, HasMany
} from 'sequelize-typescript';
import { Product } from './Product';

@Table
export class Brand extends Model {

  @HasMany(() => Product)
  products!: Product[];

  @Column
  name!: string;

}
