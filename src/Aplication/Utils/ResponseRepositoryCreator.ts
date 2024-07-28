import { DocumentData } from "firebase/firestore";
import { FireBaseResponse } from "../../Domain/Commons/Response/Repository/FireBaseResponse";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ReponseRepositoryCreator
{

    static MakeResponse(status:boolean, data?:{id:string, data:DocumentData}[] | {id:string}, details? : string) : FireBaseResponse
    {
        if(status)
        {
            return new FireBaseResponse(status,"Operacion realizada con exito detalles: " + details, data)
        }
        else
        {
            return new FireBaseResponse(status,"Ocurrio un error al realizar el proceso detalles: " + details, undefined)
        }
    }

    
}