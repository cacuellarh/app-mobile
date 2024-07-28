import { Injectable } from '@angular/core';
import { ICommand } from '../Contracts/Command/ICommand';
import { ICommandHandleService } from '../Contracts/Command/ICommandHandleService';

@Injectable({
  providedIn: 'root',
})
export class CommandHandleService implements ICommandHandleService {
  private historyCommands: ICommand[] = [];
  ExecuteCommand(Command: ICommand): void {
    Command.Execute().catch((error) => console.error(error));
    this.historyCommands.push(Command)
  }
  UndoLastCommand(): void {
    const command = this.historyCommands.pop();
    if (command) {
      command.Undo().catch((error) => console.error(error));
    }
  }
}
