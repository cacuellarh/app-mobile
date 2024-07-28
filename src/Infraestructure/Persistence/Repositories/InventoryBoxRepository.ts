import { Firestore } from '@angular/fire/firestore';
import { Injectable } from "@angular/core";
import { IInventoryBoxRepository } from '../../../Aplication/Contracts/Repository/IInventoryBoxRepository';
import { BaseRepository } from './BaseRepository';
import { InventoryBox } from '../../../Domain/Entities/InventoryBox';

@Injectable({
    providedIn: 'root',
})
export class InventoryBoxRepository extends BaseRepository<InventoryBox> implements IInventoryBoxRepository
{
    constructor( _firestore: Firestore)
    {
        super(_firestore)

    }
    CalculateTotalBox(inventoryField: InventoryBox): number {
        return inventoryField.BoxValue * inventoryField.Cuantity
    }
    override collectionName: string = "InventoryBox"
}