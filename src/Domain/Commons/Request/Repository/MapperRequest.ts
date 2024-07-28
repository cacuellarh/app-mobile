import { DocumentData } from "firebase/firestore";

export class MapperRequest {

    constructor(
        public id : string,
        public dataToMap : DocumentData
    ){}

}