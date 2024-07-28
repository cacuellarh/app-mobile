import { Inject, Injectable } from '@angular/core';
import { InventoryBox } from '../../../../../Domain/Entities/InventoryBox';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { IUpdateCuantityRequest } from '../../../Base/Request/IUpdateCuantityRequest';
import { UPDATE_CUANTITY_REQUEST } from '../../../../../app/token';
import { InventoryBoxFields } from '../../../Base/Enums/InventoryBoxFields';

@Injectable({
  providedIn: 'root',
})
export class UpdateFieldCommand implements ICommand {
  private lastValue!: number;
  private findRecord!: InventoryBox;
  constructor(
    @Inject(UPDATE_CUANTITY_REQUEST)
    private request: IUpdateCuantityRequest<InventoryBox>
  ) {}
  Execute(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.findRecord = this.request.collectionData.find(
          (inventory) => inventory.Id == this.request.id
        ) as InventoryBox;

        if (this.findRecord != undefined) {
          switch (this.request.fieldType) {
            case InventoryBoxFields.Cuantity:
              this.lastValue = this.findRecord.Cuantity;
              this.findRecord.Cuantity = this.request.newValue;

              break;
            case InventoryBoxFields.BoxValue:
              this.lastValue = this.findRecord.BoxValue;
              this.findRecord.BoxValue = this.request.newValue;
          }
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  Undo(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.findRecord !== undefined && this.lastValue !== undefined) {
        switch (this.request.fieldType) {
          case InventoryBoxFields.BoxValue:
            this.findRecord.BoxValue = this.lastValue;
            break;
          case InventoryBoxFields.Cuantity:
            this.findRecord.Cuantity = this.lastValue;
            break;
        }
        resolve();
      } else {
        reject(
          new Error(
            `inventario:${this.findRecord} o cantidad: ${this.lastValue} no obtenidos correctamente`
          )
        );
      }
    });
  }
}
