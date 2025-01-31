import type { ModifierManager } from "@/models/ModifierManager";
import { Item } from "../Item";

export interface IItemFactoryCreateOptions {
  modifierManager: ModifierManager;
  deep?: boolean;
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
}
