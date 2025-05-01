import { createModifiable } from '@/models/Modifiable';
import { SerializedModifierSchema } from './schemas';
import { ModifierType, ModifiableTag, ModifierRarity } from './types';
import type { IModifier, IModifierOptions } from '@/models/interfaces/IModifier';

export function createModifier(options: IModifierOptions = {}): IModifier {
  const {
    modifierType = ModifierType.ADDITIVE,
    target = ModifiableTag.STRENGTH,
    rarity = ModifierRarity.COMMON,
  } = options;

  return {
    ...createModifiable(options),
    modifierType,
    target,
    rarity,
  };
}

export const ModifierUtils = {
  serialize(modifier: IModifier): string {
    const modifierOptions: IModifierOptions = {
      id: modifier.id,
      name: modifier.name,
      description: modifier.description,
      parentId: modifier.parentId,
      tags: modifier.tags,
      baseVal: modifier.baseVal,
      modifierType: modifier.modifierType,
      target: modifier.target,
      rarity: modifier.rarity,
    };

    return JSON.stringify(modifierOptions);
  },

  deserialize(input: string): IModifier | undefined {
    try {
      const parsed = SerializedModifierSchema.parse(JSON.parse(input));
      return createModifier(parsed);
    } catch (e) {
      console.error('Error deserializing modifier:', e);
      return undefined;
    }
  },

  copy(modifier: IModifier, preserveId?: boolean): IModifier {
    const copiedModifier = this.deserialize(this.serialize(modifier)) as IModifier;
    if (!preserveId) {
      copiedModifier.id = crypto.randomUUID();
    }
    return copiedModifier;
  },
};
