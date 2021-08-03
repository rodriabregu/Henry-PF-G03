import { Model, Column, Table, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
import { CategoryType } from './CategoryType';

@Table
export class Category extends Model<Category> {



}
