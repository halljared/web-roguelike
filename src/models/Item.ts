import { createModifiableGroup, ModifiableGroupUtils } from '@/models/ModifiableGroup';
import { createAttribute } from '@/models/modifiables/Attribute';
import { createModifier } from '@/models/Modifier';
import type { IModifiableGroup } from '@/models/interfaces/IModifiableGroup';
import type { IItem, IItemOptions } from '@/models/interfaces/IItem';

export function createItem(options: IItemOptions = {}): IItem {
  const item = {
    ...createModifiableGroup(options),
  };
  return item;
}

export const ItemUtils = {
  serialize(item: IItem): string {
    const base = ModifiableGroupUtils.baseJSON(item);
    return JSON.stringify({ base });
  },

  deserialize(input: string): IItem | undefined {
    let item: IItem | undefined = undefined;
    try {
      const parsed = JSON.parse(input);
      const deserializedItem = ModifiableGroupUtils.deserializeBase(parsed);
      if (deserializedItem) {
        const base = deserializedItem.base;
        const baseOpts = {
          ...base, // Copy all properties from deserializedItem.base
          attributes: base.attributes.map((attr) => createAttribute(attr)),
          modifiers: base.modifiers.map((mod) => createModifier(mod)),
        };
        item = createItem(baseOpts);
      }
    } catch (e) {
      console.error(e);
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
