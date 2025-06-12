import { ItemFactory } from '@/models/factories/ItemFactory';
import { ModifierManager } from '@/models/ModifierManager';
import type { IItem } from '@/models/interfaces/IItem';
import { useModifierTemplateStore } from '@/stores/modifierTemplateStore';
import type { IGenerateItemOptions } from '@/models/types';
import type { IModifier } from '@/models/interfaces/IModifier';
import { ModifiableGroupUtils } from '@/models/ModifiableGroup';

export class Playground {
  private _selectedCopies: IItem[] = [];
  private _modifierManager: ModifierManager = new ModifierManager();

  get selectedCopies(): IItem[] {
    return this._selectedCopies;
  }

  public tick(): void {
    this._selectedCopies.forEach((copy) => {
      // TODO: Implement tick
    });
  }

  getModifiedBy(item: IItem): Set<IModifier> {
    const allModifiers = new Set<IModifier>();

    ModifiableGroupUtils.getModifiables(item).forEach((modifiable) => {
      const modifiers = this._modifierManager.getModifiers(modifiable);
      if (modifiers) {
        modifiers.forEach((modifier) => allModifiers.add(modifier));
      }
    });

    return allModifiers;
  }

  addCopy(item: IItem): void {
    const copy = ItemFactory.fromItem(item, {
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
