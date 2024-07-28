import { DocumentData } from "firebase/firestore";

export interface CollectionData {
    id: string;
    data: DocumentData;
  }