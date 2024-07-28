import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFactoryForm } from '../../Contracts/Factory/IFactoryForm';
import { DateFormat } from '../../../../Aplication/Utils/DateFormat';

export class InventoryBoxFormFactory implements IFactoryForm {
  private builder: FormBuilder = new FormBuilder()
  CreateForm(): FormGroup {
    return this.builder.group({
      Product: ['', Validators.required],
      BoxValue: ['', Validators.required],
      Cuantity: ['', Validators.required],
      Date:[DateFormat.getDate()]
    });
  }
}
