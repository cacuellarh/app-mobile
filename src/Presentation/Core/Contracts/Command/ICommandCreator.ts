import { ICommand } from "./ICommand";

export interface ICommandCreator
{
    Create(...arg : any[]) : ICommand
}