import { FormGroup } from '@angular/forms';
import { InventoryBox } from '../../Domain/Entities/InventoryBox';
import { IMapper } from '../Contracts/Map/IMap';

export class InventoryBoxMapper implements IMapper<InventoryBox> {
  MapTo(dataArray: any): InventoryBox {
    let inventory: InventoryBox = {
      Id: dataArray.id,
      BoxValue: dataArray.data['BoxValue'],
      Cuantity: dataArray.data['Cuantity'],
      Date: dataArray.data['Date'],
      Product: dataArray.data['Product'],
    };
    return inventory;
  }
  MapFrom(form: FormGroup): InventoryBox {
    let inventory: InventoryBox = {
      BoxValue: form.value.BoxValue,
      Cuantity: form.value.Cuantity,
      Date: form.value.Date,
      Product: form.value.Product,
      TotalValue: 0,
    };

    return inventory;
  }
}
