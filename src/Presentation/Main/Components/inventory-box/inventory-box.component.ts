import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { InventoryBoxUseCaseFacade } from '../../../../Aplication/UseCase/InventoryBox/Facade/InventoryBoxUseCaseFacade';
import {
  CALCULATE_USE_CASE,
  COMMAND_FACTORY,
  COMMAND_SERVICE,
  FORM_FACTORY,
  INVENTORY_SERVICE,
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
import { InventoryBoxFields } from '../../../Core/Base/Enums/InventoryBoxFields';
import { InventoryBoxFormFactory } from '../../../Core/Factory/Forms/InventoryBoxFormFactory';
import { IFactoryForm } from '../../../Core/Contracts/Factory/IFactoryForm';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommandFactory } from '../../../Core/Factory/Commands/CommandFactory';
import { CommandType } from '../../../Core/Base/Enums/CommandsType';
import { IInventoryServices } from '../../../Core/Contracts/Services/IInventoryServices';
import { InventoryBaseComponent } from '../Base/InventoryBaseComponent';
import { InventoryServices } from '../../../Core/Services/InventoryServices';

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
    { provide: INVENTORY_SERVICE, useClass: InventoryServices<InventoryBox> },
  ],
})
export class InventoryBoxComponent
  extends InventoryBaseComponent<InventoryBox>
  implements OnInit, OnDestroy
{
  constructor(
    @Inject(USE_CASE_GENERIC)
    private inventoryBoxUseCaseFacade: IUseCaseFacade<InventoryBox>,
    @Inject(MAPPER)
    private mapper: IMapper<InventoryBox>,
    @Inject(CALCULATE_USE_CASE)
    private calculateTotalUseCase: IUseCase<InventoryBox, number>,
    @Inject(FORM_FACTORY)
    private formFactory: IFactoryForm,
    @Inject(INVENTORY_SERVICE)
    private inventoryService: IInventoryServices<InventoryBox>
  ) {
    super(inventoryService);

    this.inventoryBoxForm = this.formFactory.CreateForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  async ngOnInit() {
    await this.LoadRecords();
  }
  collectionInventoryBox: InventoryBox[] = [];
  private destroy$ = new Subject<void>();
  OpenCreateProduct: boolean = false;
  public InventoryBoxFields = InventoryBoxFields;
  public inventoryBoxForm!: FormGroup;

  async LoadRecords() {
    this.collectionInventoryBox.length = 0;
    await this.LoadDataBase(this.calculateTotal.bind(this));
  }

  updateField($event: any, id: string, fields: InventoryBoxFields) {
    this.UpdateFieldBase($event, id, fields, this.collectionInventoryBox);
    this.calculateTotal();
  }

  private calculateTotal(): void {
    this.collectionInventoryBox.forEach((inventoryBox) => {
      this.calculateTotalUseCase.Execute(inventoryBox).then((total) => {
        inventoryBox.TotalValue = total;
      });
    });
  }
  async createRecord() {
    this.CreateRecordBase();
    this.LoadRecords();
  }
  public updateProductName(id: string, event: any) {
    this.UpdateProductNameBase(id, event);
  }

  public OpenCreateProductEvent() {
    this.OpenCreateProduct = true;
  }

  async delete(inventory: InventoryBox) {
    this.DeleteBase(inventory, this.LoadRecords.bind(this));
  }

  lastCommand() {
    this.LastCommandBase();
    this.calculateTotal();
  }

  protected override GetCollection(): InventoryBox[] {
    return this.collectionInventoryBox;
  }
  protected override GetMapper(): IMapper<InventoryBox> {
    return this.mapper;
  }
  protected override GetFacade(): IUseCaseFacade<InventoryBox> {
    return this.inventoryBoxUseCaseFacade;
  }
  protected override GetCommandType(): CommandType {
    return CommandType.LoadRecords;
  }

  protected override GetForm(): FormGroup {
    return this.inventoryBoxForm;
  }
}
