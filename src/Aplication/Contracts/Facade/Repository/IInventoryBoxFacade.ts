import { FireBaseResponse } from "../../../../Domain/Commons/Response/Repository/FireBaseResponse";

export interface IGetByDateFacade
{
    GetByDate(date: Date) : Promise<FireBaseResponse>
}