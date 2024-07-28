import { BaseEntity } from "../Commons/Models/BaseEntity";

export interface TotalValues extends BaseEntity
{
    TotalUnit : number
    TotalBox : number
    TotalCredit : number
    TotalProvider : number
    Date : Date
}