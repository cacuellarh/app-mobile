import { ICommand } from '../../../Contracts/Command/ICommand';
import { ICommandCreator } from '../../../Contracts/Command/ICommandCreator';
import { InventoryBox } from '../../../../../Domain/Entities/InventoryBox';
import { UpdateProductNameCommand } from '../../../Commands/EntityCommands/InventoryBox/UpdateProductNameCommand';

export class UpdateProductNameCreator
  implements ICommandCreator
{
  Create(...args: any[]): ICommand {
    return new UpdateProductNameCommand(
      args[0] as InventoryBox[],
      args[1] as string,
      args[2] as string
    );
  }
}