import {
  Model, Column, Table, DataType,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'

@Table
export class Modelx extends Model<Modelx> {

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    comment: 'Some value'
  })
  id!: number;

  /*  options: 
string  ->	STRING
boolean ->	BOOLEAN
number  ->  INTEGER
bigint  ->	BIGINT
Date    ->	DATE
Buffer  ->  BLOB
 */

  @Column
  name!: string;

  @Column(DataType.TEXT)
  dato1!: string;

}
