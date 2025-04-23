import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { createModifier } from '@/models/Modifier';
import { ModifierRarity, ModifierType, ModifiableTag } from '@/models/types';
import type { IModifier } from '@/models/interfaces/IModifier';

export const useModifierTemplateStore = defineStore('modifierTemplateStore', () => {
  // State: Store items in a Map for quick access by id
  const modifiers = ref<Map<string, IModifier>>(new Map());
  const initialModifiers = [
    createModifier({
      name: 'Strength Boost',
      description: 'Increases strength by a small amount',
      baseVal: 5,
      modifierType: ModifierType.ADDITIVE,
      target: ModifiableTag.STRENGTH,
      rarity: ModifierRarity.COMMON,
    }),
    createModifier({
      name: 'Agility Boost',
      description: 'Increases agility by a small amount',
      baseVal: 5,
      modifierType: ModifierType.ADDITIVE,
      target: ModifiableTag.HEALTH,
      rarity: ModifierRarity.COMMON,
    }),
    createModifier({
      name: 'Intelligence Boost',
      description: 'Increases intelligence by a small amount',
      baseVal: 5,
      modifierType: ModifierType.ADDITIVE,
      target: ModifiableTag.MANA,
      rarity: ModifierRarity.COMMON,
    }),
    createModifier({
      name: 'Rare Strength Boost',
      description: 'Significantly increases strength',
      baseVal: 15,
      modifierType: ModifierType.ADDITIVE,
      target: ModifiableTag.STRENGTH,
      rarity: ModifierRarity.RARE,
    }),
  ];
  initialModifiers.forEach((modifier) => {
    if (modifier.id) {
      modifiers.value.set(modifier.id, modifier);
    }
  });

  // Getters
  const getModifierById = computed(() => (id: string) => {
    return modifiers.value.get(id) || null;
  });
  const list = computed(() => () => {
    return [...modifiers.value.values()];
  });

  // Actions
  function setModifier(modifier: IModifier): void {
    if (modifier.id) {
      modifiers.value.set(modifier.id, modifier);
    }
  }
  function removeModifier(modifierId: string) {
    modifiers.value.delete(modifierId);
  }

  return {
    modifiers,
    getModifierById,
    list,
    setModifier,
    removeModifier,
  };
});
export type ModifierTemplateStore = ReturnType<typeof useModifierTemplateStore>;
