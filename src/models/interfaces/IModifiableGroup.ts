import type { IGameObject, IRequiredGameObjectOptions } from '@/models/interfaces/IGameObject';
import type { IAttribute } from '@/models/interfaces/IAttribute';
import type { IModifier } from '@/models/interfaces/IModifier';
import type { IModifiableOptions } from '@/models/interfaces/IModifiable';
import type { IModifierOptions } from '@/models/interfaces/IModifier';

export interface IModifiableGroup extends IGameObject {
  attributes: IAttribute[];
  modifiers: IModifier[];
}

export interface IModifiableGroupDeserialized {
  base: IRequiredGameObjectOptions & {
    attributes: (IRequiredGameObjectOptions & IModifiableOptions)[];
    modifiers: (IRequiredGameObjectOptions & IModifiableOptions & IModifierOptions)[];
  };
}

export interface IModifiableGroupOptions extends IGameObject {
  attributes: IAttribute[];
  modifiers: IModifier[];
}
