import { z } from 'zod';
import type { IModifiable } from '@/models/interfaces/IModifiable';
import type { IModifiableGroup } from '@/models/interfaces/IModifiableGroup';
import { SerializedModifiableGroupSchema } from './schemas';
import type {
  IModifiableGroupDeserialized,
  IModifiableGroupOptions,
} from '@/models/interfaces/IModifiableGroup';
import { createGameObject } from '@/models/GameObject';

export function createModifiableGroup(options: IModifiableGroupOptions = {}): IModifiableGroup {
  const { attributes, modifiers, artifactConfigs, parentId } = options;
  const modifiableGroup = {
    ...createGameObject(options),
    parentId: parentId ?? '',
    attributes: attributes ?? [],
    modifiers: modifiers ?? [],
    artifactConfigs: artifactConfigs ?? [],
  };
  return modifiableGroup;
}

export const ModifiableGroupUtils = {
  deserializeBase(obj: object): IModifiableGroupDeserialized | undefined {
    try {
      const parsed = SerializedModifiableGroupSchema.parse(obj);
      return parsed;
    } catch (e) {
      console.error('Schema validation error:', e);
      if (e instanceof z.ZodError) {
        console.error('Validation errors:', e.errors);
      }
      return undefined;
    }
  },

  baseJSON(base: IModifiableGroup): object {
    return { ...base };
  },

  clearModifiables(modifiableGroup: IModifiableGroup): void {
    modifiableGroup.attributes = [];
    modifiableGroup.modifiers = [];
  },

  getModifiables(modifiableGroup: IModifiableGroup): IModifiable[] {
    return [...modifiableGroup.attributes, ...modifiableGroup.modifiers];
  },
};
