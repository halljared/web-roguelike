import { type IGenerateModifierOptions } from '@/models/types';
import { Modifier } from '@/models/Modifier';
import type { ModifierTemplateStore } from '@/stores/modifierTemplateStore';

export class ModifierFactory {
  static createModifier(store: ModifierTemplateStore, spec: IGenerateModifierOptions): Modifier {
    const modifiers = store.list().filter((modifier) => modifier.rarity === spec.rarity);
    // TODO: kind of hacky, never intend to have no modifiers
    if (modifiers.length === 0) {
      return new Modifier();
    }
    const randomIndex = Math.floor(Math.random() * modifiers.length);
    return Modifier.copy(modifiers[randomIndex]);
  }
}
