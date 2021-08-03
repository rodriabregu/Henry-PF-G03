import {
  Model, Column, Table, DataType,
  HasMany, HasOne, BelongsTo, BelongsToMany, ForeignKey
} from 'sequelize-typescript'


@Table
export class Modelx extends Model<Modelx> {

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

  @Column({
    type: DataType.FLOAT,
    comment: 'Some value',
  })
  dato2!: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false
  })
  dato3!: number;

}
