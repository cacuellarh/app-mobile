import { IUseCaseFacade } from "../../../../../Aplication/Contracts/Facade/IUseCaseFacade";
import { IMapper } from "../../../../../Aplication/Contracts/Map/IMap";
import { BaseEntity } from "../../../../../Domain/Commons/Models/BaseEntity";
import { LoadRecords } from "../../../Commands/EntityCommands/Common/LoadRecords";
import { ICommand } from "../../../Contracts/Command/ICommand";
import { ICommandCreator } from "../../../Contracts/Command/ICommandCreator";
import { CalculateTotalDelegate } from "../../../Delegates/CalculateTotalDelegate";

export class LoadRecordsCreator<T extends BaseEntity> implements ICommandCreator
{
    Create(...args: any[]): ICommand {
        return new LoadRecords<T>(
            args[0] as IUseCaseFacade<T>,
            args[1] as IMapper<T>,
            args[2] as T[],
            args[3] as CalculateTotalDelegate
          );
    }
    
}