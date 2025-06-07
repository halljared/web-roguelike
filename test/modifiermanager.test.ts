import { describe, it, expect, beforeEach } from 'vitest';
import { ModifierManager } from '../src/models/ModifierManager';
import { createModifiable } from '../src/models/Modifiable';
import { createModifier } from '../src/models/Modifier';
import { ModifiableTag, ModifierType, ModifierRarity } from '../src/models/types';
import type { IModifiable } from '../src/models/interfaces/IModifiable';
import type { IModifier } from '../src/models/interfaces/IModifier';

describe('ModifierManager', () => {
  let manager: ModifierManager;
  let modifiable: IModifiable;
  let modifier: IModifier;

  beforeEach(() => {
    manager = new ModifierManager();
    modifiable = createModifiable({
      tags: [ModifiableTag.STRENGTH],
      baseVal: 10,
    });
    modifier = createModifier({
      target: ModifiableTag.STRENGTH,
      modifierType: ModifierType.ADDITIVE,
      rarity: ModifierRarity.COMMON,
      baseVal: 5,
    });
  });

  describe('registration', () => {
    it('should register a modifiable', () => {
      manager.registerModifiable(modifiable);
      expect(manager.getAllModifiables()).toContain(modifiable);
    });

    it('should register a modifier', () => {
      manager.registerModifier(modifier);
      expect(manager.getAllModifiers()).toContain(modifier);
    });
  });

  describe('relationships', () => {
    it('should create relationship between matching modifiable and modifier', () => {
      manager.registerModifiable(modifiable);
      manager.registerModifier(modifier);

      const modifiers = manager.getModifiers(modifiable);
      const modifiables = manager.getModifiables(modifier);

      expect(modifiers).toBeDefined();
      expect(modifiers?.has(modifier)).toBe(true);
      expect(modifiables).toBeDefined();
      expect(modifiables?.has(modifiable)).toBe(true);
    });

    it('should not create relationship between non-matching modifiable and modifier', () => {
      const nonMatchingModifiable = createModifiable({
        tags: [ModifiableTag.HEALTH],
        baseVal: 10,
      });

      manager.registerModifiable(nonMatchingModifiable);
      manager.registerModifier(modifier);

      const modifiers = manager.getModifiers(nonMatchingModifiable);
      const modifiables = manager.getModifiables(modifier);

      expect(modifiers).toBeUndefined();
      expect(modifiables).toBeUndefined();
    });
  });

  describe('removal', () => {
    it('should remove a modifiable and its relationships', () => {
      manager.registerModifiable(modifiable);
      manager.registerModifier(modifier);

      manager.removeModifiable(modifiable);

      expect(manager.getAllModifiables()).not.toContain(modifiable);
      expect(manager.getModifiers(modifiable)).toBeUndefined();
      expect(manager.getModifiables(modifier)).toBeUndefined();
    });

    it('should remove a modifier and its relationships', () => {
      manager.registerModifiable(modifiable);
      manager.registerModifier(modifier);

      manager.removeModifier(modifier);

      expect(manager.getAllModifiers()).not.toContain(modifier);
      expect(manager.getModifiers(modifiable)).toBeUndefined();
      expect(manager.getModifiables(modifier)).toBeUndefined();
    });
  });
});
