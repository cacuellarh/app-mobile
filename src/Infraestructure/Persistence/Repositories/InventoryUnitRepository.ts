import { Firestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { IInventoryUnitRepository } from '../../../Aplication/Contracts/Repository/IInventoryUnitRepository';
import { BaseRepository } from './BaseRepository';
import { InventoryUnit } from '../../../Domain/Entities/InventoryUnit';

@Injectable({
    providedIn: 'root',
})
export class InventoryUnitRepository extends BaseRepository<InventoryUnit> implements IInventoryUnitRepository
{
    constructor( _firestore: Firestore)
    {
        super(_firestore)

    }
    override collectionName: string = "InventoryUnit"
    
}