import { FormGroup } from "@angular/forms";
import { BaseEntity } from "../../../Domain/Commons/Models/BaseEntity";
import { CollectionData } from "../../../Domain/Commons/Models/CollectionData";

export interface IMapper<Entity extends BaseEntity>
{
    MapTo(dataArray : CollectionData) : Entity
    MapFrom(form : FormGroup) : Entity
}