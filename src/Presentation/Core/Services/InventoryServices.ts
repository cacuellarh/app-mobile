import { Inject, Injectable } from '@angular/core';
import { IUseCaseFacade } from '../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../../../Aplication/Contracts/Map/IMap';
import { BaseEntity } from '../../../Domain/Commons/Models/BaseEntity';
import { CommandType } from '../Base/Enums/CommandsType';
import { InventoryBoxFields } from '../Base/Enums/InventoryBoxFields';
import { IInventoryServices } from '../Contracts/Services/IInventoryServices';
import { VoidDelegate } from '../Delegates/VoidDelegate';
import {
  COMMAND_FACTORY,
  COMMAND_SERVICE,
} from '../../../app/token';
import { ICommandFactory } from '../Contracts/Command/ICommandFactory';
import { ICommandHandleService } from '../Contracts/Command/ICommandHandleService';
import { IUpdateCuantityRequest } from '../Base/Request/IUpdateCuantityRequest';
import { UpdateFieldCommand } from '../Commands/EntityCommands/InventoryBox/UpdateFieldCommand';
import { CreateRecordCommand } from '../Commands/EntityCommands/Common/CreateRecordCommand';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InventoryServices<T extends BaseEntity>
  implements IInventoryServices<T>
{
  constructor(
    @Inject(COMMAND_FACTORY)
    private commandFactory: ICommandFactory<T>,
    @Inject(COMMAND_SERVICE)
    private commanHanddler: ICommandHandleService,
  ) {}
  LoadDataService(
    commandType: CommandType,
    useCaseFacade: IUseCaseFacade<T>,
    mapper: IMapper<T>,
    collection: T[],
    calculateDataCallBack: VoidDelegate
  ): void {
    let loadDataCommand = this.commandFactory.CreateCommand(
      commandType,
      useCaseFacade,
      mapper,
      collection,
      calculateDataCallBack
    );
    this.commanHanddler.ExecuteCommand(loadDataCommand);
  }
  UpdateFieldService(
    event: any,
    id: string,
    fieldType: InventoryBoxFields,
    collectionData: T[]
  ): void {
    let onValue = event.target.value;
    if (onValue && onValue > 0) {
      let request: IUpdateCuantityRequest<T> = {
        collectionData: collectionData,
        id: id,
        newValue: onValue,
        fieldType: fieldType,
      };
      var commandUpdate = this.commandFactory.CreateCommand(
        CommandType.UpdateCuantityInventoryBox,
        request
      ) as UpdateFieldCommand;

      this.commanHanddler.ExecuteCommand(commandUpdate);
    }
  }
  CreateRecordService(
    mapper: IMapper<T>,
    useCaseFacade: IUseCaseFacade<T>,
    form: FormGroup
  ): void {
    var commandCreate = new CreateRecordCommand(mapper, useCaseFacade, form);
    this.commanHanddler.ExecuteCommand(commandCreate);
  }
  SaveAllService(collection: T[], useCaseFacade: IUseCaseFacade<T>) {
    var saveRecordsCommand = this.commandFactory.CreateCommand(
      CommandType.SaveCurrentRecords,
      collection,
      useCaseFacade
    );
    this.commanHanddler.ExecuteCommand(saveRecordsCommand);
  }
  DeleteService(
    entity: BaseEntity,
    useCaseFacade: IUseCaseFacade<T>,
    loadCallBack: VoidDelegate
  ): void {
    let deleteCommand = this.commandFactory.CreateCommand(
      CommandType.DeleteRecord,
      entity,
      useCaseFacade,
      loadCallBack
    );
    this.commanHanddler.ExecuteCommand(deleteCommand);
  }
  UpdateProductNameService(id: string, event: any, collection: T[]): void {
    var updateProductCommand = this.commandFactory.CreateCommand(
      CommandType.UpdateProductName,
      collection,
      id,
      event.target.value
    );

    this.commanHanddler.ExecuteCommand(updateProductCommand);
  }
  lastCommandService(): void {
    this.commanHanddler.UndoLastCommand();
  }
}
