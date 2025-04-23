import type { IModifiable } from '@/models/interfaces/IModifiable';
import type { ModifierType, ModifiableTag, ModifierRarity } from '@/models/types';

export interface IModifier extends IModifiable {
  modifierType: ModifierType;
  target: ModifiableTag;
  rarity: ModifierRarity;
}

export interface IModifierOptions extends Partial<IModifier> {}
