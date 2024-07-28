import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { Provider } from "../../../Domain/Entities/Provider";
import {DI_PROVIDER_REPOSITORY } from "../../../app/token";
import { IProviderRepository } from "../../Contracts/Repository/IProviderRepository";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
  })
export class CreateProviderUseCase implements IUseCase<Provider, FireBaseResponse>
{   
    constructor(
        @Inject(DI_PROVIDER_REPOSITORY) private ProviderRepository: IProviderRepository
    ) {}
    
    async Execute(params: Provider): Promise<FireBaseResponse> 
    {
        var response = await this.ProviderRepository.CreateAsync(params)
        return response
    }
}