import { FormGroup } from '@angular/forms';
import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../../../../../Aplication/Contracts/Map/IMap';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { FireBaseResponse } from '../../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { CalculateTotalDelegate } from '../../../Delegates/CalculateTotalDelegate';

export class CreateRecordCommand<T extends BaseEntity> implements ICommand {
  constructor(
    private mapper: IMapper<T>,
    private useCaseFacade: IUseCaseFacade<T>,
    private formData: FormGroup,
  ) {}
  async Execute(): Promise<void> {
    if (this.formData.valid) {
      var entity = this.mapper.MapFrom(this.formData);
      this.useCaseFacade.Create(entity).subscribe({
        next: (response: FireBaseResponse) => {
          console.log(response)
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  Undo(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
