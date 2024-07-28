import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import {DI_PROVIDER_REPOSITORY } from "../../../app/token";
import { IProviderRepository } from "../../Contracts/Repository/IProviderRepository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class DeleteProviderUseCase implements IUseCase<string, FireBaseResponse>
{   
    constructor(
        @Inject(DI_PROVIDER_REPOSITORY) private ProviderRepository: IProviderRepository
    ) {}
    
    async Execute(params: string): Promise<FireBaseResponse> 
    {
        var response = await this.ProviderRepository.DeleteRecordAsync(params)
        return response
    }
}