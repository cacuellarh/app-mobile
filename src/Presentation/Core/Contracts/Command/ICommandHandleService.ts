import { VoidDelegate } from "../../Delegates/VoidDelegate";
import { ICommand } from "./ICommand";

export interface ICommandHandleService
{
    ExecuteCommand(Command : ICommand) : void
    UndoLastCommand(reload? : VoidDelegate) : void
}