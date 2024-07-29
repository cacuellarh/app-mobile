import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';
import { DeleteRecordCommand } from '../../../Commands/EntityCommands/Common/DeleteRecordCommand';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { ICommandCreator } from '../../../Contracts/Command/ICommandCreator';

export class DeleteRecordCreator<T extends BaseEntity>
  implements ICommandCreator
{
  Create(...arg: any[]): ICommand {
    return new DeleteRecordCommand<T>(
      arg[0] as T,
      arg[1] as IUseCaseFacade<T>,
      arg[2] 
    );
  }
}
