import { Inject, Injectable } from "@angular/core";
import { UseCaseCrudBase } from "../../../../Domain/Commons/Request/Facade/UseCaseCrudBase";
import { IUseCaseFacade } from "../../../Contracts/Facade/IUseCaseFacade";
import { IInventoryUnitRepository } from "../../../Contracts/Repository/IInventoryUnitRepository";
import { FACTORY_REPOSITORIES } from "../../../../app/token";
import { IRepositoryFactory } from "../../../Contracts/Factory/IRepositoryFactory";
import { InventoryUnit } from "../../../../Domain/Entities/InventoryUnit";
import { RepositoryName } from "../../../../Domain/Commons/EnumData/RepositoryName";
import { GetInventoryUnitUseCase } from "../GetInventoryUnitUseCase";
import { CreateInventoryUnitUseCase } from "../CreateInventoryUnitUseCase";
import { UpdateInventoryUnitUseCase } from "../UpdateInventoryUnitUseCase";
import { DeleteInventoryUnitUseCase } from "../DeleteInventoryUnitUseCase";
import { FireBaseResponse } from "../../../../Domain/Commons/Response/Repository/FireBaseResponse";
import { from, Observable } from "rxjs";
@Injectable({
  providedIn: 'root',
})

export class InventoryUnitUseCaseFacade implements IUseCaseFacade<InventoryUnit> {
  private crudUseCase!: UseCaseCrudBase;
  private InventoryUnitRepository!: IInventoryUnitRepository;
  constructor(
    @Inject(FACTORY_REPOSITORIES) private repositoryFactory: IRepositoryFactory
  ) {
    this.InventoryUnitRepository = this.repositoryFactory.create(
      RepositoryName.InventoryUnit
    );
    this.crudUseCase = {
      get: new GetInventoryUnitUseCase(this.InventoryUnitRepository),
      create: new CreateInventoryUnitUseCase(this.InventoryUnitRepository),
      update: new UpdateInventoryUnitUseCase(this.InventoryUnitRepository),
      delete: new DeleteInventoryUnitUseCase(this.InventoryUnitRepository),
    };
  }
  GetAll(): Observable<FireBaseResponse> {
    return from(this.crudUseCase.get.Execute())
  }
  Update(id: string, updateData: InventoryUnit): Observable<FireBaseResponse> {
    return from(this.crudUseCase.update.Execute({ id: id, updateData: updateData }))
  }
  Delete(id: string): Observable<FireBaseResponse> {
    return from(this.crudUseCase.delete.Execute(id))
  }
  Create(inventoryBox: InventoryUnit): Observable<FireBaseResponse> {
    return from(this.crudUseCase.create.Execute(inventoryBox))
  }
}
