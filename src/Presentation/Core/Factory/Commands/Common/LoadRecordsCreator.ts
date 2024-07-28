import { IUseCaseFacade } from "../../../../../Aplication/Contracts/Facade/IUseCaseFacade";
import { IMapper } from "../../../../../Aplication/Contracts/Map/IMap";
import { BaseEntity } from "../../../../../Domain/Commons/Models/BaseEntity";
import { LoadRecords } from "../../../Commands/EntityCommands/Common/LoadRecords";
import { ICommand } from "../../../Contracts/Command/ICommand";
import { ICommandCreator } from "../../../Contracts/Command/ICommandCreator";
import { CalculateTotalDelegate } from "../../../Delegates/CalculateTotalDelegate";

export class LoadRecordsCreator implements ICommandCreator
{
    Create(...args: any[]): ICommand {
        return new LoadRecords<BaseEntity>(
            args[0] as IUseCaseFacade<BaseEntity>,
            args[1] as IMapper<BaseEntity>,
            args[2] as BaseEntity[],
            args[3] as CalculateTotalDelegate
          );
    }
    
}