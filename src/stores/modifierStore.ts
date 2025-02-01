import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Modifier } from '@/models/Modifier';

export const useModifierStore = defineStore('modifierStore', () => {
  // State: Store items in a Map for quick access by id
  const modifiers = ref<Map<string, Modifier>>(new Map());

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
export type ModifierStore = ReturnType<typeof useModifierStore>;
