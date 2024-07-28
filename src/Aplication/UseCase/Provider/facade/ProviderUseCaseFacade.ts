import { Inject, Injectable } from '@angular/core';
import { UseCaseCrudBase } from '../../../../Domain/Commons/Request/Facade/UseCaseCrudBase';
import { IUseCaseFacade } from '../../../Contracts/Facade/IUseCaseFacade';
import { IProviderRepository } from '../../../Contracts/Repository/IProviderRepository';
import { FACTORY_REPOSITORIES } from '../../../../app/token';
import { IRepositoryFactory } from '../../../Contracts/Factory/IRepositoryFactory';
import { Provider } from '../../../../Domain/Entities/Provider';
import { RepositoryName } from '../../../../Domain/Commons/EnumData/RepositoryName';
import { GetProviderUseCase } from '../GetProviderUseCase';
import { CreateProviderUseCase } from '../CreateProviderUseCase';
import { UpdateProviderUseCase } from '../UpdateProviderUseCase';
import { DeleteProviderUseCase } from '../DeleteProviderUseCase';
import { FireBaseResponse } from '../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProviderUseCaseFacade implements IUseCaseFacade<Provider> {
  private crudUseCase!: UseCaseCrudBase;
  private ProviderRepository!: IProviderRepository;
  constructor(
    @Inject(FACTORY_REPOSITORIES) private repositoryFactory: IRepositoryFactory
  ) {
    this.ProviderRepository = this.repositoryFactory.create(
      RepositoryName.Provider
    );
    this.crudUseCase = {
      get: new GetProviderUseCase(this.ProviderRepository),
      create: new CreateProviderUseCase(this.ProviderRepository),
      update: new UpdateProviderUseCase(this.ProviderRepository),
      delete: new DeleteProviderUseCase(this.ProviderRepository),
    };
  }
  GetAll(): Observable<FireBaseResponse> {
    return from(this.crudUseCase.get.Execute());
  }
  Update(id: string, updateData: Provider): Observable<FireBaseResponse> {
    return from(
      this.crudUseCase.update.Execute({ id: id, updateData: updateData })
    );
  }
  Delete(id: string): Observable<FireBaseResponse> {
    return from(this.crudUseCase.delete.Execute(id));
  }
  Create(inventoryBox: Provider): Observable<FireBaseResponse> {
    return from(this.crudUseCase.create.Execute(inventoryBox));
  }
}
