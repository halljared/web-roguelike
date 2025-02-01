import { type IModifierSpec } from '@/models/types';
import { Modifier } from '@/models/Modifier';
import type { ModifierStore } from '@/stores/modifierStore';

export class ModifierFactory {
  static createModifier(store: ModifierStore, spec: IModifierSpec): Modifier {
    const modifiers = store.list().filter((modifier) => modifier.rarity === spec.rarity);
    if (modifiers.length === 0) {
      return new Modifier();
    }
    const randomIndex = Math.floor(Math.random() * modifiers.length);
    return Modifier.copy(modifiers[randomIndex]);
  }
}
