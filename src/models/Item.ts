import { createModifiableGroup, ModifiableGroupUtils } from '@/models/ModifiableGroup';
import { createAttribute } from '@/models/modifiables/Attribute';
import { createModifier } from '@/models/Modifier';
import type { IItem, IItemOptions } from '@/models/interfaces/IItem';
import { SerializedItemSchema } from '@/models/schemas';
import { z } from 'zod';

export function createItem(options: IItemOptions = {}): IItem {
  const item = {
    ...createModifiableGroup(options),
    targetIds: options.targetIds || [],
  };
  return item;
}

export const ItemUtils = {
  serialize(item: IItem): string {
    const base = ModifiableGroupUtils.baseJSON(item);
    const itemProperties = {
      targetIds: item.targetIds,
    };
    return JSON.stringify({ base, itemProperties });
  },

  deserialize(input: string): IItem | undefined {
    let item: IItem | undefined = undefined;
    try {
      const parsed = JSON.parse(input);
      const validated = SerializedItemSchema.parse(parsed);
      if (validated) {
        const { base, itemProperties } = validated;
        const baseOpts = {
          ...base,
          attributes: base.attributes.map((attr) => createAttribute(attr)),
          modifiers: base.modifiers.map((mod) => createModifier(mod)),
          ...itemProperties,
        };
        item = createItem(baseOpts);
      }
    } catch (e) {
      console.error('Error deserializing item:', e);
      if (e instanceof z.ZodError) {
        console.error('Validation errors:', e.errors);
      }
    }
    return item;
  },

  copy(item: IItem, preserveId?: boolean): IItem {
    const copiedItem = ItemUtils.deserialize(ItemUtils.serialize(item)) as IItem;
    if (!preserveId) {
      copiedItem.id = crypto.randomUUID();
    }
    return copiedItem;
  },
};
