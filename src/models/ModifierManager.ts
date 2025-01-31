import type { Modifier } from "@/models/Modifier";
import type { Modifiable } from "@/models/Modifiable";

export type ConditionFunction = (
  modifiable: Modifiable,
  modifier: Modifier
) => boolean;

const defaultMatcher: ConditionFunction = (
  modifiable: Modifiable,
  modifier: Modifier
): boolean => {
  return modifiable.tags.some((tag) => tag === modifier.target);
};

export class ModifierManager {
  private modifiableToModifiers = new Map<Modifiable, Set<Modifier>>();
  private modifierToModifiables = new Map<Modifier, Set<Modifiable>>();
  private allModifiables = new Set<Modifiable>();
  private allModifiers = new Set<Modifier>();
  private matchers = [defaultMatcher];

  // Generic remove method to handle both modifiable and modifier removal
  private removeItem<T extends Modifiable | Modifier>(
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

  removeModifiable(modifiable: Modifiable): void {
    this.removeItem(
      modifiable,
      this.allModifiables,
      this.modifiableToModifiers,
      this.modifierToModifiables
    );
  }

  removeModifier(modifier: Modifier): void {
    this.removeItem(
      modifier,
      this.allModifiers,
      this.modifierToModifiables,
      this.modifiableToModifiers
    );
  }

  registerModifiable(modifiable: Modifiable): void {
    if (this.allModifiables.add(modifiable)) {
      this.allModifiers.forEach((modifier) => {
        if (this.matches(modifiable, modifier)) {
          this.addRelationship(modifiable, modifier);
        }
      });
    }
  }

  registerModifier(modifier: Modifier): void {
    if (this.allModifiers.add(modifier)) {
      this.allModifiables.forEach((modifiable) => {
        if (this.matches(modifiable, modifier)) {
          this.addRelationship(modifiable, modifier);
        }
      });
    }
  }

  matches(modifiable: Modifiable, modifier: Modifier): boolean {
    return this.matchers.every((matcher) => matcher(modifiable, modifier));
  }

  // Simplified relationship management
  private addRelationship(modifiable: Modifiable, modifier: Modifier): void {
    this.modifiableToModifiers
      .set(modifiable, this.modifiableToModifiers.get(modifiable) ?? new Set())
      .get(modifiable)!
      .add(modifier);

    this.modifierToModifiables
      .set(modifier, this.modifierToModifiables.get(modifier) ?? new Set())
      .get(modifier)!
      .add(modifiable);
  }

  getModifiers(modifiable: Modifiable): Set<Modifier> | undefined {
    return this.modifiableToModifiers.get(modifiable);
  }

  // Get all modifiables that a specific modifier modifies
  getModifiables(modifier: Modifier): Set<Modifiable> | undefined {
    return this.modifierToModifiables.get(modifier);
  }

  // Get all registered modifiables (even if un-mapped)
  getAllModifiables(): Set<Modifiable> {
    return this.allModifiables;
  }

  // Get all registered modifiers (even if un-mapped)
  getAllModifiers(): Set<Modifier> {
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
