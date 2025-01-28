import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Item } from '@/models/Item';
import { PlaygroundModel } from '@/models/PlaygroundModel';

export const usePlaygroundStore = defineStore('playgroundStore', () => {
  // State
  const model = ref(new PlaygroundModel());

  // Getters
  const selectedCopies = computed(() => model.value.selectedCopies);

  // Actions
  function addCopy(item: Item): void {
    model.value.addCopy(item);
  }

  function removeCopy(itemId: string): void {
    model.value.removeCopy(itemId);
  }

  function clearCopies(): void {
    model.value.clearCopies();
  }

  return {
    selectedCopies,
    addCopy,
    removeCopy,
    clearCopies,
  };
});
