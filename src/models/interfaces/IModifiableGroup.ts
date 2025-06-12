import type { IGameObject, IGameObjectOptions } from '@/models/interfaces/IGameObject';
import type { IAttribute } from '@/models/interfaces/IAttribute';
import type { IModifier } from '@/models/interfaces/IModifier';
import type { IModifiableOptions } from '@/models/interfaces/IModifiable';
import type { IModifierOptions } from '@/models/interfaces/IModifier';
import type { ModifiableTag } from '@/models/types';

export interface IArtifactConfig {
  val: number;
}

export interface IModifiableGroup extends IGameObject {
  attributes: IAttribute[];
  modifiers: IModifier[];
  artifactConfigs: {
    [key in ModifiableTag]?: IArtifactConfig;
  };
}

export interface IModifiableGroupDeserialized {
  base: IGameObjectOptions & {
    attributes: (IGameObjectOptions & IModifiableOptions)[];
    modifiers: (IGameObjectOptions & IModifiableOptions & IModifierOptions)[];
    artifactConfigs: {
      [key in ModifiableTag]?: IArtifactConfig;
    };
  };
}

export interface IModifiableGroupOptions extends Partial<IModifiableGroup> {}
