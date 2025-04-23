import { type IGenerateModifierOptions } from '@/models/types';
import { createModifier, ModifierUtils } from '@/models/Modifier';
import type { IModifier } from '@/models/interfaces/IModifier';
import type { ModifierTemplateStore } from '@/stores/modifierTemplateStore';

export class ModifierFactory {
  static createModifier(store: ModifierTemplateStore, spec: IGenerateModifierOptions): IModifier {
    const modifiers = store.list().filter((modifier) => modifier.rarity === spec.rarity);
    // TODO: kind of hacky, never intend to have no modifiers
    if (modifiers.length === 0) {
      return createModifier();
    }
    const randomIndex = Math.floor(Math.random() * modifiers.length);
    return ModifierUtils.copy(modifiers[randomIndex]);
  }
}
