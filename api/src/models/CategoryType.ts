import { Model, Column, Table, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Category } from './Category';

@Table
export class CategoryType extends Model{  
  
  @PrimaryKey
  @AutoIncrement
  @Column
  id!:number;
  
  @Column
  description!: string;
  
  @HasMany(() => Category)
  categoryId!: Category[];

}
