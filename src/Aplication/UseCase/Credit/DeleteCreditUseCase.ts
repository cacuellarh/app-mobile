import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_CREDIT_REPOSITORY } from "../../../app/token";
import { ICreditRepository } from "../../Contracts/Repository/ICreditRepository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class DeleteCreditUseCase implements IUseCase<string, FireBaseResponse>
{   
    constructor(
        @Inject(DI_CREDIT_REPOSITORY) private CreditRepository: ICreditRepository
    ) {}
    
    async Execute(params: string): Promise<FireBaseResponse>  
    {
        var response = await this.CreditRepository.DeleteRecordAsync(params)
        return response
    }
}