import type { IModifiableGroup } from '@/models/interfaces/IModifiableGroup';

export interface IItem extends IModifiableGroup {
  targetIds: string[];
}

export interface IItemOptions extends Partial<IItem> {}
