import type { IGameObject, IGameObjectOptions } from '@/models/interfaces/IGameObject';
import type { IAttribute } from '@/models/interfaces/IAttribute';
import type { IModifier } from '@/models/interfaces/IModifier';
import type { IModifiableOptions } from '@/models/interfaces/IModifiable';
import type { IModifierOptions } from '@/models/interfaces/IModifier';

export interface IModifiableGroup extends IGameObject {
  attributes: IAttribute[];
  modifiers: IModifier[];
}

export interface IModifiableGroupDeserialized {
  base: IGameObjectOptions & {
    attributes: (IGameObjectOptions & IModifiableOptions)[];
    modifiers: (IGameObjectOptions & IModifiableOptions & IModifierOptions)[];
  };
}

export interface IModifiableGroupOptions extends Partial<IModifiableGroup> {}
