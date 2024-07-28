import { Inject, Injectable } from "@angular/core";
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { IUseCase } from "../../../Domain/Commons/UseCase/IUseCase";
import { TotalValues } from "../../../Domain/Entities/TotalValues";
import { ITotalValueRepository } from "../../Contracts/Repository/ITotalValueRepository";
import { TotalValueRepository } from "../../../Infraestructure/Persistence/Repositories/TotalValueRepository";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
  })
export class CreateTotalValueUseCase implements IUseCase<TotalValues, FireBaseResponse>
{   
    constructor(
        @Inject(TotalValueRepository) private TotalValueRepository: ITotalValueRepository
    ) {}
    
    async Execute(params: TotalValues): Promise<FireBaseResponse> 
    {
        var response = await this.TotalValueRepository.CreateAsync(params)
        return response
    }
}