import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { ITotalValueRepository } from "../../Contracts/Repository/ITotalValueRepository";
import { TotalValueRepository } from "../../../Infraestructure/Persistence/Repositories/TotalValueRepository";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class GetTotalValueUseCase implements IUseCase<string, FireBaseResponse>
{   
    constructor(
        @Inject(TotalValueRepository) private TotalValueRepository: ITotalValueRepository
    ) {}
    
    async Execute(date : string): Promise<FireBaseResponse> 
    {
        var response = await this.TotalValueRepository.GetValueByDate(date,"Date")
        return response
    }
}