import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { Credit } from "../../../Domain/Entities/Credit";
import { DI_CREDIT_REPOSITORY} from "../../../app/token";
import { ICreditRepository } from "../../Contracts/Repository/ICreditRepository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class CreateCreditUseCase implements IUseCase<Credit, FireBaseResponse>
{   
    constructor(
        @Inject(DI_CREDIT_REPOSITORY) private CreditRepository: ICreditRepository
    ) {}
    
    async Execute(params: Credit): Promise<FireBaseResponse> 
    {
        var response = await this.CreditRepository.CreateAsync(params)
        return response
    }
}