import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { ICommandCreator } from '../../../Contracts/Command/ICommandCreator';
import { SaveCurrentRecordsCommand } from '../../../Commands/EntityCommands/Common/SaveCurrentRecordsCommand';

export class SaveCurrentRecordsCreator<T extends BaseEntity>
  implements ICommandCreator
{
  Create(...args: any[]): ICommand {
    return new SaveCurrentRecordsCommand<T>(
      args[0] as T[],
      args[1] as IUseCaseFacade<T>,
    );
  }
}
