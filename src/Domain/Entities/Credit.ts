import { BaseEntity } from "../Commons/Models/BaseEntity";

export interface Credit extends BaseEntity{

    ClientName : string,
    CreditValue : number

}