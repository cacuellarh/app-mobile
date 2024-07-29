import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { InventoryBoxUseCaseFacade } from '../../../../Aplication/UseCase/InventoryBox/Facade/InventoryBoxUseCaseFacade';
import {
  CALCULATE_USE_CASE,
  COMMAND_FACTORY,
  COMMAND_SERVICE,
  FORM_FACTORY,
  MAPPER,
  USE_CASE_GENERIC,
} from '../../../../app/token';
import { IUseCaseFacade } from '../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { InventoryBox } from '../../../../Domain/Entities/InventoryBox';
import { Subject } from 'rxjs';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { InventoryBoxMapper } from '../../../../Aplication/Mappers/InventoryBoxMapper';
import { IMapper } from '../../../../Aplication/Contracts/Map/IMap';
import { CalculateTotalInventoryBoxUseCase } from '../../../../Aplication/UseCase/InventoryBox/CalculateTotalInventoryBoxUseCase';
import { IUseCase } from '../../../../Domain/Commons/UseCase/IUseCase';
import { CommandHandleService } from '../../../Core/Commands/CommandHandleService';
import { ICommandHandleService } from '../../../Core/Contracts/Command/ICommandHandleService';
import { UpdateFieldCommand } from '../../../Core/Commands/EntityCommands/InventoryBox/UpdateFieldCommand';
import { IUpdateCuantityRequest } from '../../../Core/Base/Request/IUpdateCuantityRequest';
import { InventoryBoxFields } from '../../../Core/Base/Enums/InventoryBoxFields';
import { LoadRecords } from '../../../Core/Commands/EntityCommands/Common/LoadRecords';
import { InventoryBoxFormFactory } from '../../../Core/Factory/Forms/InventoryBoxFormFactory';
import { IFactoryForm } from '../../../Core/Contracts/Factory/IFactoryForm';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateRecordCommand } from '../../../Core/Commands/EntityCommands/Common/CreateRecordCommand';
import { ICommandFactory } from '../../../Core/Contracts/Command/ICommandFactory';
import { CommandFactory } from '../../../Core/Factory/Commands/CommandFactory';
import { CommandType } from '../../../Core/Base/Enums/CommandsType';
import { BaseRepository } from '../../../../Infraestructure/Persistence/Repositories/BaseRepository';

@Component({
  selector: 'app-inventory-box',
  standalone: true,
  imports: [CommonModule, NgForOf, NgFor, ReactiveFormsModule],
  templateUrl: './inventory-box.component.html',
  styleUrl: './inventory-box.component.css',
  providers: [
    { provide: USE_CASE_GENERIC, useClass: InventoryBoxUseCaseFacade },
    { provide: MAPPER, useClass: InventoryBoxMapper },
    {
      provide: CALCULATE_USE_CASE,
      useClass: CalculateTotalInventoryBoxUseCase,
    },
    { provide: COMMAND_SERVICE, useClass: CommandHandleService },
    { provide: FORM_FACTORY, useClass: InventoryBoxFormFactory },
    { provide: COMMAND_FACTORY, useClass: CommandFactory<InventoryBox> },
  ],
})
export class InventoryBoxComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(USE_CASE_GENERIC)
    private inventoryBoxUseCaseFacade: IUseCaseFacade<InventoryBox>,
    @Inject(MAPPER)
    private mapper: IMapper<InventoryBox>,
    @Inject(CALCULATE_USE_CASE)
    private calculateTotalUseCase: IUseCase<InventoryBox, number>,
    @Inject(COMMAND_SERVICE)
    private commanHanddler: ICommandHandleService,
    @Inject(FORM_FACTORY)
    private formFactory: IFactoryForm,
    @Inject(COMMAND_FACTORY)
    private commandFactory: ICommandFactory<InventoryBox>
  ) {
    this.inventoryBoxForm = this.formFactory.CreateForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async ngOnInit() {
    await this.LoadData();
  }
  collectionData: InventoryBox[] = [];
  private destroy$ = new Subject<void>();
  private errorMesage: string = '';
  private commandUpdate!: UpdateFieldCommand;
  private commandCreate!: CreateRecordCommand<InventoryBox>;
  OpenCreateProduct: boolean = false;
  public InventoryBoxFields = InventoryBoxFields;
  public inventoryBoxForm!: FormGroup;

  async LoadData() {
    this.collectionData.length = 0;
    let loadDataCommand = this.commandFactory.CreateCommand(
      CommandType.LoadRecords,
      this.inventoryBoxUseCaseFacade,
      this.mapper,
      this.collectionData,
      this.CalculateTotal.bind(this)
    );
    this.commanHanddler.ExecuteCommand(loadDataCommand);
  }

  private CalculateTotal(): void {
    this.collectionData.forEach((inventoryBox) => {
      this.calculateTotalUseCase.Execute(inventoryBox).then((total) => {
        inventoryBox.TotalValue = total;
      });
    });
  }

  async UpdateField(event: any, id: string, fieldType: InventoryBoxFields) {
    let onValue = event.target.value;
    if (onValue && onValue > 0) {
      let request: IUpdateCuantityRequest<InventoryBox> = {
        collectionData: this.collectionData,
        id: id,
        newValue: onValue,
        fieldType: fieldType,
      };
      this.commandUpdate = this.commandFactory.CreateCommand(
        CommandType.UpdateCuantityInventoryBox,
        request
      ) as UpdateFieldCommand;

      this.commanHanddler.ExecuteCommand(this.commandUpdate);
      this.CalculateTotal();
    }
  }
  async createRecord() {
    this.commandCreate = new CreateRecordCommand(
      this.mapper,
      this.inventoryBoxUseCaseFacade,
      this.inventoryBoxForm
    );

    this.commanHanddler.ExecuteCommand(this.commandCreate);
    this.saveAll();
    await this.LoadData();
  }

  public saveAll() {
    var saveRecordsCommand = this.commandFactory.CreateCommand(
      CommandType.SaveCurrentRecords,
      this.collectionData,
      this.inventoryBoxUseCaseFacade
    );
    this.commanHanddler.ExecuteCommand(saveRecordsCommand);
  }

  public OpenCreateProductEvent() {
    this.OpenCreateProduct = true;
  }
  async Delete(inventory: InventoryBox) {
    let deleteCommand = this.commandFactory.CreateCommand(
      CommandType.DeleteRecord,
      inventory,
      this.inventoryBoxUseCaseFacade,
      this.LoadData.bind(this)
    );
    this.commanHanddler.ExecuteCommand(deleteCommand);
  }

  lastCommand() {
    this.commanHanddler.UndoLastCommand();
    this.CalculateTotal();
  }
}
