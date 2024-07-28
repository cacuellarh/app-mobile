import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_PROVIDER_REPOSITORY } from "../../../app/token";
import { IProviderRepository } from "../../Contracts/Repository/IProviderRepository";
import { Provider } from "../../../Domain/Entities/Provider";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class UpdateProviderUseCase implements IUseCase<{id:string,updateData:Provider}, FireBaseResponse>
{   
    constructor(
        @Inject(DI_PROVIDER_REPOSITORY) private ProviderRepository: IProviderRepository
    ) {}
    
    async Execute(params: {id:string,updateData:Provider}): Promise<FireBaseResponse> 
    {
        var response = await this.ProviderRepository.UpdateAsync(params.id,params.updateData)
        return response
    }
}