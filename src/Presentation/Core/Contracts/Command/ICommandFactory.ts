import { CommandType } from "../../Base/Enums/CommandsType";
import { ICommand } from "./ICommand";

export interface ICommandFactory
{
    CreateCommand(commandType : CommandType, ...args : any[]) : ICommand
    GetCommand(commandType : CommandType) : ICommand
}