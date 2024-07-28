import { CommandType } from "../../Base/Enums/CommandsType";
import { LoadRecords } from "../../Commands/EntityCommands/Common/LoadRecords";
import { ICommand } from "../../Contracts/Command/ICommand";
import { ICommandCreator } from "../../Contracts/Command/ICommandCreator";
import { ICommandFactory } from "../../Contracts/Command/ICommandFactory";
import { LoadRecordsCreator } from "./Common/LoadRecordsCreator";

export class CommandFactory implements ICommandFactory
{
    private commandCreator: Map<CommandType,ICommandCreator> = new Map()

    constructor()
    {
        this.RegisterCommands()
    }
    private RegisterCommands()
    {
        this.commandCreator.set(CommandType.LoadRecords, new LoadRecordsCreator())
    }
    CreateCommand(commandType: CommandType, ...args: any[]): ICommand {
        
        const creator = this.commandCreator.get(commandType)

        if(!creator)
        {
            throw new Error(`El tipo de comando ${commandType}, no esta registrado o no es reconocido.`)
        }

        return creator.Create(args)
    }
    GetCommand(commandType: CommandType): ICommand {
        throw new Error("Method not implemented.");
    }
    

}