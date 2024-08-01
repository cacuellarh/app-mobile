import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';
import { FireBaseResponse } from '../../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { VoidDelegate } from '../../../Delegates/VoidDelegate';

type Load = () => void;

export class DeleteRecordCommand<T extends BaseEntity> implements ICommand {
  constructor(
    private entity: T,
    private facade: IUseCaseFacade<T>,
    private loadCallBack : VoidDelegate
  ) {}
  async Execute(): Promise<void> {
    this.facade.Delete(this.entity.Id as string).subscribe({
      next: (response: FireBaseResponse) => {
        if (response.status) {
          this.loadCallBack()
          console.log(response.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  async Undo(): Promise<void> {
    this.facade.Create(this.entity).subscribe({
      next: (response: FireBaseResponse) => {
        console.log(response.message);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
