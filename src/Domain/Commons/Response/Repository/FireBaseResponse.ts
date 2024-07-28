import { CollectionData } from "../../Models/CollectionData";

export class FireBaseResponse {
    constructor(
        public status : boolean,
        public message : string,
        public data? : CollectionData[] | {id:string}
    ){}
}