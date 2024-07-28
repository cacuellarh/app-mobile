import { BaseEntity } from '../../../../Domain/Commons/Models/BaseEntity';
import { InventoryBoxFields } from '../Enums/InventoryBoxFields';

export interface IUpdateCuantityRequest<T extends BaseEntity> {
  collectionData: T[];
  newValue: number;
  id: string;
  fieldType: InventoryBoxFields
}
