import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { DI_CREDIT_REPOSITORY} from "../../../app/token";
import { ICreditRepository } from "../../Contracts/Repository/ICreditRepository";
import { Credit } from "../../../Domain/Entities/Credit";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class UpdateCreditUseCase implements IUseCase<{id:string,updateData:Credit}, FireBaseResponse>
{   
    constructor(
        @Inject(DI_CREDIT_REPOSITORY) private CreditRepository: ICreditRepository
    ) {}
    
    async Execute(params: {id:string,updateData:Credit}): Promise<FireBaseResponse> 
    {
        var response = await this.CreditRepository.UpdateAsync(params.id,params.updateData)
        return response
    }
}