import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_INVENTORY_UNIT_REPOSITORY} from "../../../app/token";
import { IInventoryUnitRepository } from "../../Contracts/Repository/IInventoryUnitRepository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class DeleteInventoryUnitUseCase implements IUseCase<string, FireBaseResponse>
{   
    constructor(
        @Inject(DI_INVENTORY_UNIT_REPOSITORY) private inventoryUnitRepository: IInventoryUnitRepository
    ) {}
    
    async Execute(params: string): Promise<FireBaseResponse> 
    {
        var response = await this.inventoryUnitRepository.DeleteRecordAsync(params)
        return response
    }
}