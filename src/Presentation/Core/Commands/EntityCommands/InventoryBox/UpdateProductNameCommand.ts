import { InventoryBox } from '../../../../../Domain/Entities/InventoryBox';
import { ICommand } from '../../../Contracts/Command/ICommand';

export class UpdateProductNameCommand implements ICommand {
  private lastValueName!: string;
  private recordFind!: InventoryBox;
  constructor(
    private collection: InventoryBox[],
    private id: string,
    private newValue: string,
  ) {}
  async Execute(): Promise<void> {
    this.recordFind = this.collection.find(
      (record: InventoryBox) => record.Id == this.id
    ) as InventoryBox;

    if (this.recordFind) {
      this.lastValueName = this.recordFind.Product;
      this.recordFind.Product = this.newValue;
    }
  }
  async Undo(): Promise<void> {
    if (this.recordFind) {
      this.recordFind.Product = this.lastValueName;
    } else {
      throw new Error(
        `Error al revertir cambios, id:${this.id} no encontrado.`
      );
    }
  }
}
