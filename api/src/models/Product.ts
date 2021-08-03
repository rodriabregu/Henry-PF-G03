import { Model, Column, Table } from 'sequelize-typescript';
import {HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey} from 'sequelize-typescript'

@Table
export class Product extends Model<Product> {
  @Column
  name!: string;
  
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
