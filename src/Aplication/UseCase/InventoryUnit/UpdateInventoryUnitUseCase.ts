import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_INVENTORY_UNIT_REPOSITORY} from "../../../app/token";
import { IInventoryUnitRepository } from "../../Contracts/Repository/IInventoryUnitRepository";
import { InventoryUnit } from "../../../Domain/Entities/InventoryUnit";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class UpdateInventoryUnitUseCase implements IUseCase<{id:string,updateData:InventoryUnit}, FireBaseResponse>
{   
    constructor(
        @Inject(DI_INVENTORY_UNIT_REPOSITORY) private inventoryUnitRepository: IInventoryUnitRepository
    ) {}
    
    async Execute(params: {id:string,updateData:InventoryUnit}): Promise<FireBaseResponse> 
    {
        var response = await this.inventoryUnitRepository.UpdateAsync(params.id,params.updateData)
        return response
    }
}