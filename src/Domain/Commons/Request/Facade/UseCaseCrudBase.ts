import { BaseEntity } from "../../Models/BaseEntity";
import { FireBaseResponse } from "../../Response/Repository/FireBaseResponse";
import { IUseCase } from "../../UseCase/IUseCase";

export interface UseCaseCrudBase
{
    get : IUseCase<void,FireBaseResponse>
    create: IUseCase<BaseEntity,FireBaseResponse>
    update: IUseCase<{id:string,updateData:BaseEntity},FireBaseResponse>
    delete: IUseCase<string,FireBaseResponse>
}