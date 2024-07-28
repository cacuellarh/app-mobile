import { RepositoryName } from "../../../Domain/Commons/EnumData/RepositoryName";
import { BaseEntity } from "../../../Domain/Commons/Models/BaseEntity";
import { IBaseRepository } from "../Repository/IBaseRepository";

export interface IRepositoryFactory
{
    create(repositoryType : RepositoryName): IBaseRepository<BaseEntity>
}