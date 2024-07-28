
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse";

export interface IBaseRepository<T extends { [x: string]: any }> 
{
    setCollectioon(collectionName:string):void
    GetAllAsync(): Promise<FireBaseResponse>
    CreateAsync(entity : T): Promise<FireBaseResponse> 
    UpdateAsync(id:string, updateData : T) : Promise<FireBaseResponse> 
    GetRecordAsync(id: string) : Promise<FireBaseResponse> 
    DeleteRecordAsync(id: string) : Promise<FireBaseResponse> 
    GetValueByDate(date: string, fieldName:string): Promise<FireBaseResponse> 
}