import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { IInventoryBoxRepository } from "../../Contracts/Repository/IInventoryBoxRepository";
import { InventoryBoxRepository } from "../../../Infraestructure/Persistence/Repositories";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class DeleteInventoryBoxUseCase implements IUseCase<string, FireBaseResponse>
{   
    constructor(
        @Inject(InventoryBoxRepository) private inventoryBoxRepository: IInventoryBoxRepository
    ) {}
    
    async Execute(params: string): Promise<FireBaseResponse> 
    {
        var response = await this.inventoryBoxRepository.DeleteRecordAsync(params)
        return response
    }
}