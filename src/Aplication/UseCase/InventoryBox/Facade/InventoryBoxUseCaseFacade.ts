import { Inject, Injectable } from '@angular/core';
import { FireBaseResponse } from '../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { InventoryBox } from '../../../../Domain/Entities/InventoryBox';
import { IRepositoryFactory } from '../../../Contracts/Factory/IRepositoryFactory';
import { FACTORY_REPOSITORIES } from '../../../../app/token';
import { IInventoryBoxRepository } from '../../../Contracts/Repository/IInventoryBoxRepository';
import { RepositoryName } from '../../../../Domain/Commons/EnumData/RepositoryName';
import { GetInventoryBoxUseCase } from '../GetInventoryBoxUseCase';
import { UseCaseCrudBase } from '../../../../Domain/Commons/Request/Facade/UseCaseCrudBase';
import {
  CreateInventoryBoxUseCase,
  UpdateInventoryBoxUseCase,
  DeleteInventoryBoxUseCase,
} from '../index';
import { IUseCaseFacade } from '../../../Contracts/Facade/IUseCaseFacade';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryBoxUseCaseFacade implements IUseCaseFacade<InventoryBox> {
  private inventoryBoxRepository!: IInventoryBoxRepository;
  private crudUseCase!: UseCaseCrudBase;
  constructor(
    @Inject(FACTORY_REPOSITORIES) private repositoryFactory: IRepositoryFactory
  ) {
    this.inventoryBoxRepository = this.repositoryFactory.create(
      RepositoryName.InventoryBox
    ) as IInventoryBoxRepository
    this.crudUseCase = {
      get: new GetInventoryBoxUseCase(this.inventoryBoxRepository),
      create: new CreateInventoryBoxUseCase(this.inventoryBoxRepository),
      update: new UpdateInventoryBoxUseCase(this.inventoryBoxRepository),
      delete: new DeleteInventoryBoxUseCase(this.inventoryBoxRepository),
    };
  }

  GetAll(): Observable<FireBaseResponse> {
    return from(this.crudUseCase.get.Execute())
  }
  Update(id: string, updateData: InventoryBox): Observable<FireBaseResponse> {
    return from(this.crudUseCase.update.Execute({ id: id, updateData: updateData }))
  }
  Delete(id: string): Observable<FireBaseResponse> {
    return from(this.crudUseCase.delete.Execute(id))
  }
  Create(inventoryBox: InventoryBox): Observable<FireBaseResponse> {
    return from(this.crudUseCase.create.Execute(inventoryBox))
  }
}
