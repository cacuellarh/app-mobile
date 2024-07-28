import { BaseEntity } from "../Commons/Models/BaseEntity";

export interface InventoryUnit extends BaseEntity{

    Product : string
    Cuantity : number,
    BoxValue: number,
    UnitValue: number
    TotalValue?:number,
    Date : Date

}