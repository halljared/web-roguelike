import { type IModifiableGroupOptions, ModifiableGroup } from "@/types/ModifiableGroup";
import { Attribute } from "@/types/Attribute";
import { Modifier } from "@/types/Modifier";

export class Item extends ModifiableGroup {
  constructor(baseOpts?: IModifiableGroupOptions) {
    super(baseOpts);
  }

  public static serialize(item: Item): string {
    const base = ModifiableGroup.baseJSON(item);
    return JSON.stringify({ base });
  }

  public static deserialize(input: string): Item | undefined {
    let item: Item | undefined = undefined;
    try {
      const parsed = JSON.parse(input);
      const deserializedItem = ModifiableGroup.deserializeBase(parsed);
      if (deserializedItem) {
        const base = deserializedItem.base;
        const baseOpts = {
          ...base, // Copy all properties from deserializedItem.base
          attributes: base.attributes.map(attr => new Attribute(attr)),
          modifiers: base.modifiers.map(mod => new Modifier(mod)),
        };
        item = new Item(baseOpts);
      }
    } catch (e) {
      console.error(e);
    }
    return item;
  }

  public static copy(item: Item): Item {
    return Item.deserialize(Item.serialize(item)) as Item;
  }
}
