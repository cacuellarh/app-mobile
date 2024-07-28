import { Observable } from "rxjs"
import { FireBaseResponse } from "../../../Domain/Commons/Response/Repository/FireBaseResponse"

export interface IUseCaseFacade<T>
{
    GetAll() : Observable<FireBaseResponse>
    Update(id: string, updateData:T) : Observable<FireBaseResponse>
    Delete(id: string) : Observable<FireBaseResponse>
    Create(inventoryBox : T) : Observable<FireBaseResponse> 
}