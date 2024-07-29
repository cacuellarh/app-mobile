import { InjectionToken } from '@angular/core';
import { IUseCase } from '../Domain/Commons/UseCase/IUseCase';
import { FireBaseResponse } from '../Domain/Commons/Response/Repository/FireBaseResponse';
import { IInventoryBoxRepository } from '../Aplication/Contracts/Repository/IInventoryBoxRepository';
import { IInventoryUnitRepository } from '../Aplication/Contracts/Repository/IInventoryUnitRepository';
import { ICreditRepository } from '../Aplication/Contracts/Repository/ICreditRepository';
import { IProviderRepository } from '../Aplication/Contracts/Repository/IProviderRepository';
import { BaseEntity } from '../Domain/Commons/Models/BaseEntity';
import { IRepositoryFactory } from '../Aplication/Contracts/Factory/IRepositoryFactory';
import { IUseCaseFacade } from '../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../Aplication/Contracts/Map/IMap';
import { ICommandHandleService } from '../Presentation/Core/Contracts/Command/ICommandHandleService';
import { IUpdateCuantityRequest } from '../Presentation/Core/Base/Request/IUpdateCuantityRequest';
import { IFactoryForm } from '../Presentation/Core/Contracts/Factory/IFactoryForm';
import { ICommandFactory } from '../Presentation/Core/Contracts/Command/ICommandFactory';


//export const BASE_REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<Product>>('BaseRepository');
export const DI_REPOSITORY_FACTORY = new InjectionToken<IRepositoryFactory>('RepositoryFactory');

export const DI_PROVIDER_REPOSITORY = new InjectionToken<IProviderRepository>('ProviderRepository');
export const DI_CREDIT_REPOSITORY = new InjectionToken<ICreditRepository>('CreditRepository');

export const DI_INVENTORY_BOX_REPOSITORY = new InjectionToken<IInventoryBoxRepository>('InventoryBoxRepository');
export const DI_INVENTORY_UNIT_REPOSITORY = new InjectionToken<IInventoryUnitRepository>('InventoryUnitRepository');

export const USE_CASE_GET_ENTITY = new InjectionToken<IUseCase<void,FireBaseResponse>>('GenerictGet');
export const USE_CASE_CREATE_BASE_ENTITY = new InjectionToken<IUseCase<BaseEntity,FireBaseResponse>>('CreateBaseEntity');

export const FACTORY_REPOSITORIES = new InjectionToken<IRepositoryFactory>('RepositoryFactories');
export const GET_DATE_USE_CASE = new InjectionToken<IUseCase<string, FireBaseResponse>>('GetByDate');

export const USE_CASE_GENERIC = new InjectionToken<IUseCaseFacade<BaseEntity>>('UseCaseGeneric');

// maper
export const MAPPER = new InjectionToken<IMapper<BaseEntity>>('Mapper');

export const CALCULATE_USE_CASE = new InjectionToken<IUseCase<BaseEntity,Number>>('CalculateTotalUseCase');

export const COMMAND_SERVICE = new InjectionToken<ICommandHandleService>('CommandHandleService');

export const UPDATE_CUANTITY_REQUEST = new InjectionToken<IUpdateCuantityRequest<BaseEntity>>('UpdateCuantityRequest');

export const FORM_FACTORY = new InjectionToken<IFactoryForm>('FormFactory');

export const COMMAND_FACTORY = new InjectionToken<ICommandFactory<BaseEntity>>('CommandFactory');