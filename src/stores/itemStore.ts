import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IItem } from '@/models/interfaces/IItem';
import { createItem } from '@/models/Item';
import { createModifier } from '@/models/Modifier';
import { ModifiableTag } from '@/models/types';
import { createAttribute } from '@/models/modifiables/Attribute';
export const useItemStore = defineStore('itemStore', () => {
  // State: Store items in a Map for quick access by id
  const items = ref<Map<string, IItem>>(new Map());

  const initialItems = [
    createItem({
      name: 'Sword',
      description: 'A basic sword',
      attributes: [
        createAttribute({
          name: 'Damage',
          description: 'Damage dealt by the item',
          baseVal: 10,
          tags: [ModifiableTag.DAMAGE],
        }),
      ],
      modifiers: [
        createModifier({
          name: 'Damage',
          tags: [ModifiableTag.HEALTH],
          target: ModifiableTag.MANA,
        }),
      ],
      artifactConfigs: {
        [ModifiableTag.DAMAGE]: { val: 10 },
      },
    }),
    createItem({
      name: 'Potion',
      description: 'A basic potion',
      modifiers: [
        createModifier({ name: 'Heal', tags: [ModifiableTag.MANA], target: ModifiableTag.HEALTH }),
      ],
    }),
  ];

  initialItems.forEach((item) => {
    setItem(item);
  });

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
