import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Item } from "@/models/Item";
import type { Modifier } from "@/models/Modifier";
import { PlaygroundModel } from "@/models/PlaygroundModel";

export const usePlaygroundStore = defineStore("playgroundStore", () => {
  // State
  const model = ref(new PlaygroundModel());

  // Getters
  const selectedCopies = computed(() => model.value.selectedCopies);
  const modifiedCopies = computed(() =>
    selectedCopies.value.filter((copy) => getModifiedBy(copy).size > 0)
  );

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

  function getItemModifiers(item: Item): Set<Modifier> {
    return model.value.getModifiedBy(item);
  }

  function getModifiedBy(item: Item): Set<Modifier> {
    return model.value.getModifiedBy(item);
  }

  return {
    selectedCopies,
    modifiedCopies,
    addCopy,
    removeCopy,
    clearCopies,
    getItemModifiers,
    getModifiedBy,
  };
});
