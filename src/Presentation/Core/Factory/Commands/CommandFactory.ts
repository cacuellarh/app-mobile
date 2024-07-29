import { BaseEntity } from '../../../../Domain/Commons/Models/BaseEntity';
import { CommandType } from '../../Base/Enums/CommandsType';
import { DeleteRecordCommand } from '../../Commands/EntityCommands/Common/DeleteRecordCommand';
import { ICommand } from '../../Contracts/Command/ICommand';
import { ICommandCreator } from '../../Contracts/Command/ICommandCreator';
import { ICommandFactory } from '../../Contracts/Command/ICommandFactory';
import { CreateRecordCreator } from './Common/CreateRecordCreator';
import { DeleteRecordCreator } from './Common/DeleteRecordCreator';
import { LoadRecordsCreator } from './Common/LoadRecordsCreator';
import { SaveCurrentRecordsCreator } from './Common/SaveCurrentRecordsCreator';
import { UpdateFieldCreator } from './InventoryBox/UpdateFieldCreator';

export class CommandFactory<T extends BaseEntity>
  implements ICommandFactory<T>
{
  private commandCreator: Map<CommandType, ICommandCreator> = new Map();

  constructor() {
    this.RegisterCommands();
  }
  private RegisterCommands() {
    const commands = [
      { type: CommandType.LoadRecords, creator: new LoadRecordsCreator<T>() },
      { type: CommandType.CreateRecord, creator: new CreateRecordCreator<T>() },
      { type: CommandType.SaveCurrentRecords, creator: new SaveCurrentRecordsCreator<T>() },
      { type: CommandType.UpdateCuantityInventoryBox, creator: new UpdateFieldCreator() },
      {type:CommandType.DeleteRecord, creator: new DeleteRecordCreator<T>()}
      
    ];

    commands.forEach(command => {
      this.commandCreator.set(command.type, command.creator);
    });
  }
  CreateCommand(commandType: CommandType, ...args: any[]): ICommand {
    const creator = this.commandCreator.get(commandType);

    if (!creator) {
      throw new Error(
        `El tipo de comando ${commandType}, no esta registrado o no es reconocido.`
      );
    }

    return creator.Create(...args);
  }
  GetCommand(commandType: CommandType): ICommand {
    const creator = this.commandCreator.get(commandType);

    if (!creator) {
      throw new Error(
        `El tipo de comando ${commandType}, no esta registrado o no es reconocido.`
      );
    }

    return creator.Create();
  }
}
