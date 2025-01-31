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
  // Internal maps for bidirectional relationships
  private modifiableToModifiers: Map<Modifiable, Set<Modifier>>;
  private modifierToModifiables: Map<Modifier, Set<Modifiable>>;

  // Storage for all registered modifiables and modifiers
  private allModifiables: Set<Modifiable>;
  private allModifiers: Set<Modifier>;

  // List of matching strategies
  private matchers: ConditionFunction[];

  constructor() {
    this.modifiableToModifiers = new Map();
    this.modifierToModifiables = new Map();
    this.allModifiables = new Set();
    this.allModifiers = new Set();
    this.matchers = [defaultMatcher];
  }

  removeModifiable(modifiable: Modifiable): void {
    // Remove all relationships involving this modifiable
    const modifiers = this.modifiableToModifiers.get(modifiable);
    if (modifiers) {
      modifiers.forEach((modifier) => {
        this.removeRelationship(modifiable, modifier);
      });
    }

    // Remove from master set
    this.allModifiables.delete(modifiable);
  }

  removeModifier(modifier: Modifier): void {
    // Remove all relationships involving this modifier
    const modifiables = this.modifierToModifiables.get(modifier);
    if (modifiables) {
      modifiables.forEach((modifiable) => {
        this.removeRelationship(modifiable, modifier);
      });
    }

    // Remove from master set
    this.allModifiers.delete(modifier);
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

  // Add a relationship between a modifiable and a modifier
  private addRelationship(modifiable: Modifiable, modifier: Modifier): void {
    const modifiersForModifiable = this.modifiableToModifiers.get(modifiable);
    if (modifiersForModifiable) {
      modifiersForModifiable.add(modifier);
    } else {
      this.modifiableToModifiers.set(modifiable, new Set([modifier]));
    }

    const modifiablesForModifier = this.modifierToModifiables.get(modifier);
    if (modifiablesForModifier) {
      modifiablesForModifier.add(modifiable);
    } else {
      this.modifierToModifiables.set(modifier, new Set([modifiable]));
    }
  }

  // Remove a relationship between a modifiable and a modifier
  removeRelationship(modifiable: Modifiable, modifier: Modifier): void {
    if (this.modifiableToModifiers.has(modifiable)) {
      this.modifiableToModifiers.get(modifiable)!.delete(modifier);
      if (this.modifiableToModifiers.get(modifiable)!.size === 0) {
        this.modifiableToModifiers.delete(modifiable);
      }
    }

    if (this.modifierToModifiables.has(modifier)) {
      this.modifierToModifiables.get(modifier)!.delete(modifiable);
      if (this.modifierToModifiables.get(modifier)!.size === 0) {
        this.modifierToModifiables.delete(modifier);
      }
    }
  }

  // Get all modifiers that modify a specific modifiable
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
