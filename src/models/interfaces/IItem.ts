import type { IModifiableGroup } from '@/models/interfaces/IModifiableGroup';

export interface IItem extends IModifiableGroup {}

export interface IItemOptions extends Partial<IItem> {}
