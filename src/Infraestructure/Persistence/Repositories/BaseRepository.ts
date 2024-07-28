import { IBaseRepository } from '../../../Aplication/Contracts/Repository/IBaseRepository';
import { Injectable } from '@angular/core';
import {
  DocumentData,
  Firestore,
  QuerySnapshot,
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { FireBaseResponse } from '../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { ReponseRepositoryCreator } from '../../../Aplication/Utils/ResponseRepositoryCreator';
import { doc, getDoc, where } from 'firebase/firestore';
import { MapperRequest } from '../../../Domain/Commons/Request/Repository/MapperRequest';
import { DateFormat } from '../../../Aplication/Utils/DateFormat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseRepository<T extends { [x: string]: any }>
  implements IBaseRepository<T>
{
  collectionName: string = 'default';
  constructor(private _firestore: Firestore) {}

  setCollectioon(collectionName: string): void {
    this.collectionName = collectionName;
  }
  async GetAllAsync(): Promise<FireBaseResponse>  {
    try {
      const docs: QuerySnapshot<DocumentData> = await getDocs(
        query(collection(this._firestore, this.collectionName))
      );
      var Entity = docs.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      if (!docs.empty) {
        return ReponseRepositoryCreator.MakeResponse(true, Entity);
      } else {
        return ReponseRepositoryCreator.MakeResponse(
          false,
          Entity,
          `Error en ${BaseRepository.name}}`
        );
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw error;
    }
  }

  async CreateAsync(entity: T): Promise<FireBaseResponse> {
    try {
      const docRef = await addDoc(
        collection(this._firestore, this.collectionName),
        entity
      );
      return ReponseRepositoryCreator.MakeResponse(
        true,
        { id: docRef.id },
        `Registro ${docRef.id} creado con exito`
      );
    } catch (e) {
      return ReponseRepositoryCreator.MakeResponse(
        false,
        undefined,
        'Error adding document: ' + e
      );
    }
  }
  async UpdateAsync(id: string, updateData: T): Promise<FireBaseResponse> {
    const updateDocRef = doc(this._firestore, `${this.collectionName}/${id}`);

    try {
      var response = await updateDoc(updateDocRef, updateData);
      return ReponseRepositoryCreator.MakeResponse(
        true,
        undefined,
        `Registro ${updateDocRef.id} fue actualizado con exito`
      );
    } catch (e) {
      console.error('Error updating document: ', e);
    }

    return ReponseRepositoryCreator.MakeResponse(
      false,
      undefined,
      `Error al actualizar el registro ${updateDocRef.id}.`
    );
  }

  async GetRecordAsync(id: string): Promise<FireBaseResponse> {
    const getDocRef = await doc(
      this._firestore,
      `${this.collectionName}/${id}`
    );

    try {
      const recordFind = await getDoc(getDocRef);
      const data: DocumentData = recordFind.data() as DocumentData;
      if (recordFind.exists()) {
        return ReponseRepositoryCreator.MakeResponse(
          true,
          new MapperRequest(recordFind.id, data),
          `Registro ${id} obtenido correctamente`
        );
      } else {
        console.error(`El registro con Id ${id}, no existe`);
      }
    } catch (e) {
      console.error(`Ocurrio un error al obtener un registro, detalles : ${e}`);
    }

    return ReponseRepositoryCreator.MakeResponse(
      false,
      undefined,
      `El registro con Id ${id}, no existe`
    );
  }
  async DeleteRecordAsync(id: string): Promise<FireBaseResponse> {
    const docRef = doc(this._firestore, `${this.collectionName}/${id}`);

    try {
      await deleteDoc(docRef);
      return ReponseRepositoryCreator.MakeResponse(
        true,
        undefined,
        `Registro ${id} eliminado correctamente`
      );
    } catch (e) {
      console.error(`Ocurrió un error al eliminar el registro, detalles: ${e}`);
      return ReponseRepositoryCreator.MakeResponse(
        false,
        undefined,
        `Ocurrió un error al eliminar el registro: ${e}`
      );
    }
  }

  async GetValueByDate(date: string, fieldName:string): Promise<FireBaseResponse> {
    
    //let stringDate = DateFormat.ParseDate(date);
    const collectionRef = collection(this._firestore, this.collectionName);
    const queryResult = query(collectionRef, where(fieldName, '==', date));

    try {
      const querySnapshot = await getDocs(queryResult);
      if (!querySnapshot.empty) {
        var Entity = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        return ReponseRepositoryCreator.MakeResponse(true, Entity);
      } else {
        return ReponseRepositoryCreator.MakeResponse(
          false,
          undefined,
          `Error en ${BaseRepository.name}, querySnapshot indefinido}`
        );
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
      throw error;
    }
  }
}
