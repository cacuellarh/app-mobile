import { Firestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { IProviderRepository } from '../../../Aplication/Contracts/Repository/IProviderRepository';
import { BaseRepository } from './BaseRepository';
import { Provider } from '../../../Domain/Entities/Provider';

@Injectable({
    providedIn: 'root',
})
export class ProviderRepository extends BaseRepository<Provider> implements IProviderRepository
{
    constructor( _firestore: Firestore)
    {
        super(_firestore)

    }
    override collectionName: string = "Provider"
}