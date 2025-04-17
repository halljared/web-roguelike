import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Modifier } from '@/models/Modifier';
import { ModifierRarity, ModifierType, ModifiableTag } from '@/models/types';

export const useModifierTemplateStore = defineStore('modifierTemplateStore', () => {
  // State: Store items in a Map for quick access by id
  const modifiers = ref<Map<string, Modifier>>(
    new Map([
      [
        'strength_boost',
        new Modifier({
          name: 'Strength Boost',
          description: 'Increases strength by a small amount',
          baseVal: 5,
          modifierType: ModifierType.ADDITIVE,
          target: ModifiableTag.STRENGTH,
          rarity: ModifierRarity.COMMON,
        }),
      ],
      [
        'agility_boost',
        new Modifier({
          name: 'Agility Boost',
          description: 'Increases agility by a small amount',
          baseVal: 5,
          modifierType: ModifierType.ADDITIVE,
          target: ModifiableTag.HEALTH,
          rarity: ModifierRarity.COMMON,
        }),
      ],
      [
        'intelligence_boost',
        new Modifier({
          name: 'Intelligence Boost',
          description: 'Increases intelligence by a small amount',
          baseVal: 5,
          modifierType: ModifierType.ADDITIVE,
          target: ModifiableTag.MANA,
          rarity: ModifierRarity.COMMON,
        }),
      ],
      [
        'rare_strength_boost',
        new Modifier({
          name: 'Rare Strength Boost',
          description: 'Significantly increases strength',
          baseVal: 15,
          modifierType: ModifierType.ADDITIVE,
          target: ModifiableTag.STRENGTH,
          rarity: ModifierRarity.RARE,
        }),
      ],
    ])
  );

  // Getters
  const getModifierById = computed(() => (id: string) => {
    return modifiers.value.get(id) || null;
  });
  const list = computed(() => () => {
    return [...modifiers.value.values()];
  });

  // Actions
  function setModifier(modifier: Modifier): void {
    modifiers.value.set(modifier.id, modifier);
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
