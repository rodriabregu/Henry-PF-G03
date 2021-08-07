import { Model, Column, Table, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { CategoryType } from './CategoryType';
import {Product} from './Product'
import {Category} from './Category'

@Table
export class ProductsCategory extends Model{

    @ForeignKey (()=>Product)
    @Column 
    productId!:number;

    @ForeignKey (()=>Category)
    @Column 
    categoryId!:number;


}
