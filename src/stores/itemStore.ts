import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Item } from "@/models/Item";

export const useItemStore = defineStore("itemStore", () => {
  // State: Store items in a Map for quick access by id
  const items = ref<Map<string, Item>>(new Map());

  // Getters
  const getItemById = computed(() => (id: string) => {
    return items.value.get(id) || null;
  });
  const list = computed(() => () => {
    return [...items.value.values()];
  });

  // Actions
  function setItem(item: Item): void {
    items.value.set(item.id, item);
  }
  function removeItem(itemId: string) {
    items.value.delete(itemId);
  }

  return {
    items,
    getItemById,
    list,
    setItem,
    removeItem,
  };
});
