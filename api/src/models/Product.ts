import { Model, Column, Table } from 'sequelize-typescript';
import { HasMany, BelongsToMany} from 'sequelize-typescript'
import { Category } from './Category';

import { Photo } from './Photo';
import { ProductCategory } from './ProductCategory';

@Table
export class Product extends Model {

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

  @BelongsToMany(()=>Category,()=>ProductCategory)
  categories!:Category[];

}
