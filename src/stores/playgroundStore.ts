import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IItem } from '@/models/interfaces/IItem';
import type { IModifier } from '@/models/interfaces/IModifier';
import { Playground } from '@/models/Playground';
import type { IGenerateItemOptions } from '@/models/types';

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

  function addCopy(item: IItem): void {
    model.value?.addCopy(item);
  }

  function removeCopy(itemId: string): void {
    model.value?.removeCopy(itemId);
  }

  function clearCopies(): void {
    model.value?.clearCopies();
  }

  function getItemModifiers(item: IItem): Set<IModifier> {
    return model.value?.getModifiedBy(item) ?? new Set();
  }

  function getModifiedBy(item: IItem): Set<IModifier> {
    return model.value?.getModifiedBy(item) ?? new Set();
  }

  function generateItem(itemOptions: IGenerateItemOptions): void {
    model.value?.generateItem(itemOptions);
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
