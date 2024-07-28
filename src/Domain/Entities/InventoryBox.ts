import { BaseEntity } from "../Commons/Models/BaseEntity";

export interface InventoryBox extends BaseEntity{

    Product: string 
    Cuantity : number,
    BoxValue: number,
    TotalValue?:number,
    Date: string

}