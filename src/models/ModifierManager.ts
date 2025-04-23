import type { IModifier } from '@/models/interfaces/IModifier';
import type { IModifiable } from '@/models/interfaces/IModifiable';

export type ConditionFunction = (modifiable: IModifiable, modifier: IModifier) => boolean;

const defaultMatcher: ConditionFunction = (
  modifiable: IModifiable,
  modifier: IModifier
): boolean => {
  return modifiable.tags.some((tag) => tag === modifier.target);
};

export class ModifierManager {
  private modifiableToModifiers = new Map<IModifiable, Set<IModifier>>();
  private modifierToModifiables = new Map<IModifier, Set<IModifiable>>();
  private allModifiables = new Set<IModifiable>();
  private allModifiers = new Set<IModifier>();
  private matchers = [defaultMatcher];

  // Generic remove method to handle both modifiable and modifier removal
  private removeItem<T extends IModifiable | IModifier>(
    item: T,
    itemSet: Set<T>,
    relationshipMap: Map<T, Set<any>>,
    otherMap: Map<any, Set<T>>
  ): void {
    relationshipMap.get(item)?.forEach((other) => {
      // delete places where other things referenced this item
      otherMap.get(other)?.delete(item);
      if (otherMap.get(other)?.size === 0) {
        otherMap.delete(other);
      }
    });
    relationshipMap.delete(item);
    itemSet.delete(item);
  }

  removeModifiable(modifiable: IModifiable): void {
    this.removeItem(
      modifiable,
      this.allModifiables,
      this.modifiableToModifiers,
      this.modifierToModifiables
    );
  }

  removeModifier(modifier: IModifier): void {
    this.removeItem(
      modifier,
      this.allModifiers,
      this.modifierToModifiables,
      this.modifiableToModifiers
    );
  }

  registerModifiable(modifiable: IModifiable): void {
    if (this.allModifiables.add(modifiable)) {
      this.allModifiers.forEach((modifier) => {
        if (this.matches(modifiable, modifier)) {
          this.addRelationship(modifiable, modifier);
        }
      });
    }
  }

  registerModifier(modifier: IModifier): void {
    if (this.allModifiers.add(modifier)) {
      this.allModifiables.forEach((modifiable) => {
        if (this.matches(modifiable, modifier)) {
          this.addRelationship(modifiable, modifier);
        }
      });
    }
  }

  matches(modifiable: IModifiable, modifier: IModifier): boolean {
    return this.matchers.every((matcher) => matcher(modifiable, modifier));
  }

  // Simplified relationship management
  private addRelationship(modifiable: IModifiable, modifier: IModifier): void {
    this.modifiableToModifiers
      .set(modifiable, this.modifiableToModifiers.get(modifiable) ?? new Set())
      .get(modifiable)!
      .add(modifier);

    this.modifierToModifiables
      .set(modifier, this.modifierToModifiables.get(modifier) ?? new Set())
      .get(modifier)!
      .add(modifiable);
  }

  getModifiers(modifiable: IModifiable): Set<IModifier> | undefined {
    return this.modifiableToModifiers.get(modifiable);
  }

  // Get all modifiables that a specific modifier modifies
  getModifiables(modifier: IModifier): Set<IModifiable> | undefined {
    return this.modifierToModifiables.get(modifier);
  }

  // Get all registered modifiables (even if un-mapped)
  getAllModifiables(): Set<IModifiable> {
    return this.allModifiables;
  }

  // Get all registered modifiers (even if un-mapped)
  getAllModifiers(): Set<IModifier> {
    return this.allModifiers;
  }

  // Clear all relationships and optional global storage
  clear(): void {
    this.modifiableToModifiers.clear();
    this.modifierToModifiables.clear();
    this.allModifiables.clear();
    this.allModifiers.clear();
  }
}
