import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IItem } from '@/models/interfaces/IItem';

export const useItemStore = defineStore('itemStore', () => {
  // State: Store items in a Map for quick access by id
  const items = ref<Map<string, IItem>>(new Map());

  // Getters
  const getItemById = computed(() => (id: string) => {
    return items.value.get(id) || null;
  });
  const list = computed(() => () => {
    return [...items.value.values()];
  });

  // Actions
  function setItem(item: IItem): void {
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
