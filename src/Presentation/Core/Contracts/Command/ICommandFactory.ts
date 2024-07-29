import { BaseEntity } from "../../../../Domain/Commons/Models/BaseEntity";
import { CommandType } from "../../Base/Enums/CommandsType";
import { ICommand } from "./ICommand";

export interface ICommandFactory<T extends BaseEntity>
{
    CreateCommand(commandType : CommandType, ...args : any[]) : ICommand
    GetCommand(commandType : CommandType) : ICommand
}