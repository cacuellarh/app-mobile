import { FormGroup } from '@angular/forms';
import { IUseCaseFacade } from '../../../../../Aplication/Contracts/Facade/IUseCaseFacade';
import { IMapper } from '../../../../../Aplication/Contracts/Map/IMap';
import { BaseEntity } from '../../../../../Domain/Commons/Models/BaseEntity';
import { CreateRecordCommand } from '../../../Commands/EntityCommands/Common/CreateRecordCommand';
import { ICommand } from '../../../Contracts/Command/ICommand';
import { ICommandCreator } from '../../../Contracts/Command/ICommandCreator';

export class CreateRecordCreator<T extends BaseEntity>
  implements ICommandCreator
{
  Create(...args: any[]): ICommand {
    return new CreateRecordCommand<T>(
      args[0] as IMapper<T>,
      args[1] as IUseCaseFacade<T>,
      args[2] as FormGroup
    );
  }
}
