import { FormGroup } from '@angular/forms';
import { IUseCaseFacade } from '../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../../../../Aplication/Contracts/Map/IMap';
import { BaseEntity } from '../../../../Domain/Commons/Models/BaseEntity';
import { CommandType } from '../../Base/Enums/CommandsType';
import { InventoryBoxFields } from '../../Base/Enums/InventoryBoxFields';
import { VoidDelegate } from '../../Delegates/VoidDelegate';

export interface IInventoryServices<T extends BaseEntity> {
  LoadDataService(
    commandType: CommandType,
    useCaseFacade: IUseCaseFacade<T>,
    mapper: IMapper<T>,
    collection: T[],
    calculateDataCallBack: VoidDelegate
  ): void;
  UpdateFieldService(
    event: any,
    id: string,
    fieldType: InventoryBoxFields,
    collectionData: T[]
  ): void;
  CreateRecordService(
    mapper: IMapper<T>,
    useCaseFacade: IUseCaseFacade<T>,
    form: FormGroup
  ): void;

  SaveAllService(collection: T[], useCaseFacade: IUseCaseFacade<T>): void;
  DeleteService(entity: BaseEntity, useCaseFacade: IUseCaseFacade<T>, loadCallBack : VoidDelegate): void;
  UpdateProductNameService(id: string, event: any, collection: T[]): void;
  lastCommandService(): void;
}
