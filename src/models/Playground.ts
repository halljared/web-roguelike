import { Item } from '@/models/Item';
import { ModifierManager } from '@/models/ModifierManager';
import { ItemFactory } from '@/models/factories/ItemFactory';
import type { Modifier } from '@/models/Modifier';
import { useModifierTemplateStore } from '@/stores/modifierTemplateStore';
import type { IGenerateItemOptions } from '@/models/types';

export class Playground {
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
      const copy = this._selectedCopies[index];
      ItemFactory.destroy(copy, {
        modifierManager: this._modifierManager,
      });
      this._selectedCopies.splice(index, 1);
    }
  }

  clearCopies(): void {
    this._selectedCopies = [];
  }

  generateItem(itemOptions: IGenerateItemOptions): void {
    const item = ItemFactory.generate({
      modifierTemplateStore: useModifierTemplateStore(),
      itemOptions,
      modifierManager: this._modifierManager,
    });
    this._selectedCopies.push(item);
  }
}
