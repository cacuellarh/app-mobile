import { Injectable } from '@angular/core';
import { ICommand } from '../Contracts/Command/ICommand';
import { ICommandHandleService } from '../Contracts/Command/ICommandHandleService';
import { excludeCommands } from './ExcludeCommandsOfHistory';
import { VoidDelegate } from '../Delegates/VoidDelegate';

@Injectable({
  providedIn: 'root',
})
export class CommandHandleService implements ICommandHandleService {
  private historyCommands: ICommand[] = [];
  private maxLengthHistory = 5;

  ExecuteCommand(Command: ICommand): void {
    Command.Execute().catch((error) => console.error(error));
    this.SaveHistoryCommand(Command);

  }
  UndoLastCommand(reload?: VoidDelegate): void {
    const command = this.historyCommands.pop();
    if (command && typeof command.Undo === 'function') {
      command.Undo().catch((error) => console.error(error));
    }

    if (reload) {
      reload();
    }
  }

  private SaveHistoryCommand(Command: ICommand) {
    if (
      !excludeCommands.some(
        (excludeCommand) => Command instanceof excludeCommand
      )
    ) {
      if (this.maxLengthHistory == this.historyCommands.length) {
        this.historyCommands.shift();
      }
      this.historyCommands.push(Command);
    }
  }
}
