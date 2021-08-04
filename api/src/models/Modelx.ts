import {
  Model, Column, Table, DataType, Comment,
  PrimaryKey, AutoIncrement, AllowNull,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

@Table
export class Modelx extends Model<Modelx> {

  @AllowNull
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @Column(DataType.TEXT)
  dato1!: string;

}
