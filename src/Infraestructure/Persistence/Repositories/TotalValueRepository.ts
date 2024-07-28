import { Firestore, getDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BaseRepository } from './BaseRepository';
import { TotalValues } from '../../../Domain/Entities/TotalValues';
import { ITotalValueRepository } from '../../../Aplication/Contracts/Repository/ITotalValueRepository';
import { FireBaseResponse } from '../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { DateFormat } from '../../../Aplication/Utils/DateFormat';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ReponseRepositoryCreator } from '../../../Aplication/Utils/ResponseRepositoryCreator';

@Injectable({
  providedIn: 'root',
})
export class TotalValueRepository
  extends BaseRepository<TotalValues>
  implements ITotalValueRepository
{
  override collectionName: string = 'TotalValue';
  private firestore!: Firestore;
  constructor(_firestore: Firestore) {
    super(_firestore);
    this.firestore = _firestore;
  }
}
