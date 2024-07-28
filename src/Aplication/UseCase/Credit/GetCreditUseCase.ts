import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_CREDIT_REPOSITORY} from "../../../app/token";
import { ICreditRepository } from "../../Contracts/Repository/ICreditRepository";
import { CreditRepository } from "../../../Infraestructure/Persistence/Repositories/CreditRepository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class GetCreditUseCase implements IUseCase<void, FireBaseResponse>
{   
    constructor(
        @Inject(DI_CREDIT_REPOSITORY) private CreditRepository: ICreditRepository
    ) {}
    
    async Execute(): Promise<FireBaseResponse>
    {
        var response = await this.CreditRepository.GetAllAsync()

        return response
    }
}