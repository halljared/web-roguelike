import type { ModifierManager } from '@/models/ModifierManager';
import { Item } from '../Item';
import type { IModifierSpec } from '@/models/types';
import type { ModifierStore } from '@/stores/modifierStore';
import { ModifierFactory } from '@/models/factories/ModifierFactory';

export interface IItemFactoryCreateOptions {
  modifierManager: ModifierManager;
  deep?: boolean;
}

export interface IItemFactoryGenerateOptions extends IItemFactoryCreateOptions {
  modifierStore: ModifierStore;
  modifierSpec: IModifierSpec;
}

export class ItemFactory {
  static create(item: Item, options: IItemFactoryCreateOptions): Item {
    const { modifierManager, deep = false } = options;
    const newItem = Item.copy(item, deep);

    // Set the parent ID for all modifiables to the new item's ID
    newItem.getModifiables().forEach((modifiable) => {
      modifiable.parentId = newItem.id;
    });

    // Register all modifiables with the manager
    newItem.getModifiables().forEach((modifiable) => {
      modifierManager.registerModifiable(modifiable);
    });
    // Register all modifiers with the manager
    newItem.modifiers.forEach((modifier) => {
      modifierManager.registerModifier(modifier);
    });

    return newItem;
  }

  static generate(options: IItemFactoryGenerateOptions): Item {
    const { modifierStore, modifierSpec, modifierManager } = options;
    const modifier = ModifierFactory.createModifier(modifierStore, modifierSpec);
    const item = new Item();
    modifier.parentId = item.id;
    item.name = modifier.name;
    item.modifiers.push(modifier);
    modifierManager.registerModifiable(modifier);
    modifierManager.registerModifier(modifier);
    return item;
  }

  static destroy(item: Item, options: IItemFactoryCreateOptions): void {
    const { modifierManager } = options;

    // Unregister all modifiables from the manager
    item.getModifiables().forEach((modifiable) => {
      modifierManager.removeModifiable(modifiable);
    });

    // Unregister all modifiers from the manager
    item.modifiers.forEach((modifier) => {
      modifierManager.removeModifier(modifier);
    });

    // Clear references
    item.clearModifiables(); // Assuming you have this method
  }
}
