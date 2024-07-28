import { Inject, Injectable } from '@angular/core';
import { UseCaseCrudBase } from '../../../../Domain/Commons/Request/Facade/UseCaseCrudBase';
import { FireBaseResponse } from '../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { Credit } from '../../../../Domain/Entities/Credit';
import { IUseCaseFacade } from '../../../Contracts/Facade/IUseCaseFacade';
import { FACTORY_REPOSITORIES } from '../../../../app/token';
import { IRepositoryFactory } from '../../../Contracts/Factory/IRepositoryFactory';
import { CreateCreditUseCase } from '../CreateCreditUseCase';
import { RepositoryName } from '../../../../Domain/Commons/EnumData/RepositoryName';
import { ICreditRepository } from '../../../Contracts/Repository/ICreditRepository';
import { GetCreditUseCase } from '../GetCreditUseCase';
import { UpdateCreditUseCase } from '../UpdateCreditUseCase';
import { DeleteCreditUseCase } from '../DeleteCreditUseCase';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class CreditUseCaseFacade implements IUseCaseFacade<Credit> {
  private crudUseCase!: UseCaseCrudBase;
  private creditRepository!: ICreditRepository;
  constructor(
    @Inject(FACTORY_REPOSITORIES) private repositoryFactory: IRepositoryFactory
  ) {
    this.creditRepository = this.repositoryFactory.create(
      RepositoryName.Credit
    );
    this.crudUseCase = {
      get: new GetCreditUseCase(this.creditRepository),
      create: new CreateCreditUseCase(this.creditRepository),
      update: new UpdateCreditUseCase(this.creditRepository),
      delete: new DeleteCreditUseCase(this.creditRepository),
    };
  }
  GetAll(): Observable<FireBaseResponse> {
    return from(this.crudUseCase.get.Execute()) 
  }
  Update(id: string, updateData: Credit): Observable<FireBaseResponse> {
    return from(this.crudUseCase.update.Execute({ id: id, updateData: updateData }))
  }
  Delete(id: string): Observable<FireBaseResponse> {
    return from(this.crudUseCase.delete.Execute(id))
  }
  Create(inventoryBox: Credit): Observable<FireBaseResponse> {
    return from(this.crudUseCase.create.Execute(inventoryBox))
  }
}
