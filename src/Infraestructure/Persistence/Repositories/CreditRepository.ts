import { Firestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { ICreditRepository } from '../../../Aplication/Contracts/Repository/ICreditRepository';
import { BaseRepository } from './BaseRepository';
import { Credit } from '../../../Domain/Entities/Credit';

@Injectable({
    providedIn: 'root',
})
export class CreditRepository extends BaseRepository<Credit> implements ICreditRepository
{
    override collectionName: string = "Credit"
    
    constructor( _firestore: Firestore)
    {
        super(_firestore)

    }

}
