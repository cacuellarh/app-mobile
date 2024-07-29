import { ICommand } from '../../../Contracts/Command/ICommand';
import { ICommandCreator } from '../../../Contracts/Command/ICommandCreator';
import { IUpdateCuantityRequest } from '../../../Base/Request/IUpdateCuantityRequest';
import { UpdateFieldCommand } from '../../../Commands/EntityCommands/InventoryBox/UpdateFieldCommand';
import { InventoryBox } from '../../../../../Domain/Entities/InventoryBox';

export class UpdateFieldCreator
  implements ICommandCreator
{
  Create(...args: any[]): ICommand {
    return new UpdateFieldCommand(
      args[0] as IUpdateCuantityRequest<InventoryBox>,
    );
  }
}