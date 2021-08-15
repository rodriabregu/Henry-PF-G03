import { ForeignKey, Column, Model,Table, Default } from "sequelize-typescript";
import {User} from './User'
import {Product} from './Product'
import { Col } from "sequelize/types/lib/utils";

@Table
export default class ProductUser extends Model{

    @ForeignKey(()=>User)
    userId!:number

    @ForeignKey(()=>Product)
    productId!:number

    @Column({defaultValue:true})
    isActive!:boolean


}
