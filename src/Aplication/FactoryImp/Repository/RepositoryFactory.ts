import { Firestore } from '@angular/fire/firestore';
import { RepositoryName } from '../../../Domain/Commons/EnumData/RepositoryName';
import { IRepositoryFactory } from '../../Contracts/Factory/IRepositoryFactory';
import { IBaseRepository } from '../../Contracts/Repository/IBaseRepository';
import { BaseEntity } from '../../../Domain/Commons/Models/BaseEntity';
import { Injectable } from '@angular/core';
import {
  CreditRepository,
  ProviderRepository,
  InventoryBoxRepository,
  InventoryUnitRepository,
} from '../../../Infraestructure/Persistence/Repositories';

@Injectable({
  providedIn: 'root',
})
export class RepositoryFactory implements IRepositoryFactory {
  private repositoryList: {
    type: RepositoryName;
    classImp: IBaseRepository<BaseEntity>;
  }[];
  private _firestore!: Firestore;

  constructor(firestore: Firestore) {
    this._firestore = firestore;
    this.repositoryList = [
      {
        type: RepositoryName.Credit,
        classImp: new CreditRepository(firestore),
      },
      {
        type: RepositoryName.InventoryBox,
        classImp: new InventoryBoxRepository(firestore),
      },
      {
        type: RepositoryName.InventoryUnit,
        classImp: new InventoryUnitRepository(firestore),
      },
      {
        type :RepositoryName.Provider,
        classImp :new ProviderRepository(firestore)
      }
    ];
  }

  create(repositoryType: RepositoryName): IBaseRepository<BaseEntity> {
    var repository = this.repositoryList.find(
      (repo) => repo.type == repositoryType
    );

    if (!repository) {
      throw new Error(`El repositorio ${repositoryType} no fue encontrado.`);
    }

    return repository?.classImp;
  }
}
