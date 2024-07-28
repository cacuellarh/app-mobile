import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { InventoryBox } from "../../../Domain/Entities/InventoryBox";
import { IBaseRepository } from "./IBaseRepository";

export interface  IInventoryBoxRepository extends IBaseRepository<InventoryBox>
{
    CalculateTotalBox(inventoryField : InventoryBox) : number
}