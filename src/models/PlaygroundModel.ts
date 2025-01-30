import { Item } from "@/models/Item";
import { ModifierManager } from "@/models/ModifierManager";
import { ItemFactory } from "@/models/factories/ItemFactory";
import type { Modifier } from "@/models/Modifier";

export class PlaygroundModel {
  private _selectedCopies: Item[] = [];
  private _modifierManager: ModifierManager = new ModifierManager();

  get selectedCopies(): Item[] {
    return this._selectedCopies;
  }

  getModifiedBy(item: Item): Set<Modifier> {
    const allModifiers = new Set<Modifier>();

    item.getModifiables().forEach((modifiable) => {
      const modifiers = this._modifierManager.getModifiers(modifiable);
      if (modifiers) {
        modifiers.forEach((modifier) => allModifiers.add(modifier));
      }
    });

    return allModifiers;
  }

  addCopy(item: Item): void {
    const copy = ItemFactory.create(item, {
      modifierManager: this._modifierManager,
    });
    this._selectedCopies.push(copy);
  }

  removeCopy(itemId: string): void {
    const index = this._selectedCopies.findIndex((copy) => copy.id === itemId);
    if (index !== -1) {
      this._selectedCopies.splice(index, 1);
    }
  }

  clearCopies(): void {
    this._selectedCopies = [];
  }
}
