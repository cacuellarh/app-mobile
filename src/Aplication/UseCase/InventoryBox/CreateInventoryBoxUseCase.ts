import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { InventoryBox } from "../../../Domain/Entities/InventoryBox";
import { IInventoryBoxRepository } from "../../Contracts/Repository/IInventoryBoxRepository";
import { CalculateTotalValue } from "../../Utils/CalculateTotalValue";
import { InventoryBoxRepository } from "../../../Infraestructure/Persistence/Repositories";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class CreateInventoryBoxUseCase implements IUseCase<InventoryBox, FireBaseResponse>
{   
    constructor(
        @Inject(InventoryBoxRepository) private inventoryBoxRepository: IInventoryBoxRepository
    ) {}
    
    async Execute(params: InventoryBox): Promise<FireBaseResponse> 
    {
        params.TotalValue = CalculateTotalValue.Calculate(params.Cuantity, params.BoxValue)
        var response = await this.inventoryBoxRepository.CreateAsync(params)
        return response
    }
}