import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';
import { FireBaseResponse } from '../../../../../Domain/Commons/Response/Repository/FireBaseResponse';
import { ICommand } from '../../../Contracts/Command/ICommand';

export class SaveCurrentRecordsCommand<T extends BaseEntity>
  implements ICommand
{
  constructor(private colletion: T[], private facade: IUseCaseFacade<T>) {}
  async Execute(): Promise<void> {
    this.colletion.forEach((entity) => {
      this.facade.Update(entity.Id as string, entity).subscribe({
        next: (response: FireBaseResponse) => {
          if (response.status) {
            console.log(response.message);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }
  Undo(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
