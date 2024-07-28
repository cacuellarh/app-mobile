import { ICommand } from "./ICommand";

export interface ICommandHandleService
{
    ExecuteCommand(Command : ICommand) : void
    UndoLastCommand() : void
}