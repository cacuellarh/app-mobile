import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { IInventoryBoxRepository } from "../../Contracts/Repository/IInventoryBoxRepository";
import { InventoryBox } from "../../../Domain/Entities/InventoryBox";
import { InventoryBoxRepository } from "../../../Infraestructure/Persistence/Repositories";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class UpdateInventoryBoxUseCase implements IUseCase<{id:string,updateData:InventoryBox}, FireBaseResponse>
{   
    constructor(
        @Inject(InventoryBoxRepository) private inventoryBoxRepository: IInventoryBoxRepository
    ) {}
    
    async Execute(params: {id:string,updateData:InventoryBox}): Promise<FireBaseResponse>
    {
        var response = await this.inventoryBoxRepository.UpdateAsync(params.id,params.updateData)
        return response
    }
}