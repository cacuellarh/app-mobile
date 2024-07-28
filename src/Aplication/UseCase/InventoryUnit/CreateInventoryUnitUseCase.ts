import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_INVENTORY_UNIT_REPOSITORY } from "../../../app/token";
import { InventoryUnit } from "../../../Domain/Entities/InventoryUnit";
import { IInventoryUnitRepository } from "../../Contracts/Repository/IInventoryUnitRepository";
import { CalculateTotalValue } from "../../Utils/CalculateTotalValue";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class CreateInventoryUnitUseCase implements IUseCase<InventoryUnit, FireBaseResponse>
{   
    constructor(
        @Inject(DI_INVENTORY_UNIT_REPOSITORY) private inventoryUnitRepository: IInventoryUnitRepository
    ) {}
    
    async Execute(params: InventoryUnit): Promise<FireBaseResponse>
    {
        params.TotalValue = CalculateTotalValue.Calculate(params.Cuantity, params.UnitValue)
        var response = await this.inventoryUnitRepository.CreateAsync(params)
        return response
    }
}