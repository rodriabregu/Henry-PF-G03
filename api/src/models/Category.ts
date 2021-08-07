import { Model, Column, Table, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Product } from './Product'
import { ProductsCategory } from './ProductsCategory';


@Table
export class Category extends Model {

  @Column
  name!: string;

  @BelongsToMany(() => Product, () => ProductsCategory)
  products!: Product[]

}

//Category.belongsToMany(Product, { through: ProductsCategory });
