import { Inject, Injectable } from "@angular/core";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { IInventoryBoxRepository } from "../../Contracts/Repository/IInventoryBoxRepository";
import { InventoryBoxRepository } from "../../../Infraestructure/Persistence/Repositories";
import { InventoryBox } from "../../../Domain/Entities/InventoryBox";

@Injectable({
    providedIn: 'root',
  })
export class CalculateTotalInventoryBoxUseCase implements IUseCase<InventoryBox, number>
{   
    constructor(
        @Inject(InventoryBoxRepository) private inventoryBoxRepository: IInventoryBoxRepository
    ) {}
    
    async Execute(params: InventoryBox): Promise<number> 
    {
        var response = await this.inventoryBoxRepository.CalculateTotalBox(params)
        return response
    }
}