import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Item } from '@/models/Item';
import type { Modifier } from '@/models/Modifier';
import { Playground } from '@/models/Playground';
import type { IModifierSpec } from '@/models/types';

export const usePlaygroundStore = defineStore('playgroundStore', () => {
  // State
  const model = ref<Playground | null>(null);

  // Getters
  const playground = computed(() => model.value);
  const selectedCopies = computed(() => model.value?.selectedCopies ?? []);
  const modifiedCopies = computed(() =>
    selectedCopies.value.filter((copy) => getModifiedBy(copy).size > 0)
  );

  // Actions
  function setPlayground(playground: Playground): void {
    model.value = playground;
  }

  function addCopy(item: Item): void {
    model.value?.addCopy(item);
  }

  function removeCopy(itemId: string): void {
    model.value?.removeCopy(itemId);
  }

  function clearCopies(): void {
    model.value?.clearCopies();
  }

  function getItemModifiers(item: Item): Set<Modifier> {
    return model.value?.getModifiedBy(item) ?? new Set();
  }

  function getModifiedBy(item: Item): Set<Modifier> {
    return model.value?.getModifiedBy(item) ?? new Set();
  }

  function generateItem(modifierSpec: IModifierSpec): void {
    model.value?.generateItem(modifierSpec);
  }
  return {
    playground,
    selectedCopies,
    modifiedCopies,
    addCopy,
    removeCopy,
    clearCopies,
    getItemModifiers,
    getModifiedBy,
    generateItem,
    setPlayground,
  };
});
