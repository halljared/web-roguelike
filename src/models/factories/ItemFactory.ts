import type { ModifierManager } from '@/models/ModifierManager';
import { createItem, ItemUtils } from '../Item';
import type { IGenerateItemOptions } from '@/models/types';
import type { ModifierTemplateStore } from '@/stores/modifierTemplateStore';
import { ModifierFactory } from '@/models/factories/ModifierFactory';
import type { IItem } from '@/models/interfaces/IItem';
import { ModifiableGroupUtils } from '@/models/ModifiableGroup';

export interface IItemFactoryCreateOptions {
  modifierManager: ModifierManager;
  deep?: boolean;
}

export interface IItemFactoryGenerateOptions extends IItemFactoryCreateOptions {
  modifierTemplateStore: ModifierTemplateStore;
  itemOptions: IGenerateItemOptions;
}

export class ItemFactory {
  static create(item: IItem, options: IItemFactoryCreateOptions): IItem {
    const { modifierManager, deep = false } = options;
    const newItem = ItemUtils.copy(item, deep);

    // Set the parent ID for all modifiables to the new item's ID
    ModifiableGroupUtils.getModifiables(newItem).forEach((modifiable) => {
      modifiable.parentId = newItem.id;
    });

    // Register all modifiables with the manager
    ModifiableGroupUtils.getModifiables(newItem).forEach((modifiable) => {
      modifierManager.registerModifiable(modifiable);
    });
    // Register all modifiers with the manager
    newItem.modifiers.forEach((modifier) => {
      modifierManager.registerModifier(modifier);
    });

    return newItem;
  }

  static generate(options: IItemFactoryGenerateOptions): IItem {
    const { modifierTemplateStore, itemOptions, modifierManager } = options;
    const modifiers = [];
    for (let i = 0; i < itemOptions.numberOfModifiers; i++) {
      const modifier = ModifierFactory.createModifier(
        modifierTemplateStore,
        itemOptions.modifierOptions
      );
      modifiers.push(modifier);
    }
    const item = createItem();
    modifiers.forEach((modifier) => {
      modifier.parentId = item.id;
      item.name = modifier.name;
      item.modifiers.push(modifier);
      modifierManager.registerModifier(modifier);
    });
    return item;
  }

  static destroy(item: IItem, options: IItemFactoryCreateOptions): void {
    const { modifierManager } = options;

    // Unregister all modifiables from the manager
    ModifiableGroupUtils.getModifiables(item).forEach((modifiable) => {
      modifierManager.removeModifiable(modifiable);
    });

    // Unregister all modifiers from the manager
    item.modifiers.forEach((modifier) => {
      modifierManager.removeModifier(modifier);
    });

    // Clear references
    ModifiableGroupUtils.clearModifiables(item);
  }
}
