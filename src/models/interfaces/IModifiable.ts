import type { IGameObject } from '@/models/interfaces/IGameObject';
import type { ModifiableTag } from '@/models/types';

export interface IModifiable extends IGameObject {
  tags: ModifiableTag[];
  baseVal: number;
}

export interface IModifiableOptions extends Partial<IModifiable> {}
