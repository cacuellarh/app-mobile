import { FormGroup } from '@angular/forms';
import { IUseCaseFacade } from '../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../../../../Aplication/Contracts/Map/IMap';
import { BaseEntity } from '../../../../Domain/Commons/Models/BaseEntity';
import { CommandType } from '../../../Core/Base/Enums/CommandsType';
import { InventoryBoxFields } from '../../../Core/Base/Enums/InventoryBoxFields';
import { IInventoryServices } from '../../../Core/Contracts/Services/IInventoryServices';
import { VoidDelegate } from '../../../Core/Delegates/VoidDelegate';
import { InventoryBox } from '../../../../Domain/Entities/InventoryBox';

export abstract class InventoryBaseComponent<T extends BaseEntity> {
  constructor(protected inventoryServices: IInventoryServices<T>) {}

  async LoadDataBase(calculateCallback: VoidDelegate) {
    this.inventoryServices.LoadDataService(
      this.GetCommandType(),
      this.GetFacade(),
      this.GetMapper(),
      this.GetCollection(),
      calculateCallback
    );
  }

  async UpdateFieldBase(
    event: any,
    id: string,
    fieldType: InventoryBoxFields,
    collectionData: T[]
  ) {
    this.inventoryServices.UpdateFieldService(
      event,
      id,
      fieldType,
      collectionData
    );
  }

  async CreateRecordBase() {
    this.inventoryServices.CreateRecordService(
      this.GetMapper(),
      this.GetFacade(),
      this.GetForm()
    );
    this.SaveAll()
  }

  async UpdateProductNameBase(id: string, event: any) {
    this.inventoryServices.UpdateProductNameService(
      id,
      event,
      this.GetCollection()
    );
    this.SaveAll()
  }

  public DeleteBase(inventory : BaseEntity, loadCallback : VoidDelegate)
  {
    this.inventoryServices.DeleteService(inventory, this.GetFacade(),loadCallback)
  }
  public LastCommandBase()
  {
    this.inventoryServices.lastCommandService()
  }

  private SaveAll()
  {
    this.inventoryServices.SaveAllService(
      this.GetCollection(),
      this.GetFacade()
    );
  }

  

  protected abstract GetMapper(): IMapper<T>;
  protected abstract GetFacade(): IUseCaseFacade<T>;
  protected abstract GetCommandType(): CommandType;
  protected abstract GetCollection(): T[];
  protected abstract GetForm(): FormGroup;
}
