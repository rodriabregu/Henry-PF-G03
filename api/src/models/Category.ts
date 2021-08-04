import { Model, Column, Table, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import {Optional} from 'sequelize'
import {Product} from './Product'
import { ProductCategory } from './ProductCategory';

interface ICategory{
    id:number,
    description:string
}

interface CategoryCreationAttributes extends Optional<ICategory,'id'>{}

@Table
export class Category extends Model<ICategory,CategoryCreationAttributes>{

    @Column
    descritpion!:string;

    @BelongsToMany(()=>Product,()=>ProductCategory)
    products!:Product[]

}
