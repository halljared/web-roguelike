import { type IGameObjectOptions, ModifiableGroup } from "@/types/ModifiableGroup";
import { Attribute } from "@/types/Attribute";
import { Modifier } from "@/types/Modifier";

export class Item extends ModifiableGroup {
  constructor(baseOpts?: IGameObjectOptions) {
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
        const baseOpts = deserializedItem.base;
        item = new Item(baseOpts);
        item.attributes = baseOpts.attributes.map(attr => new Attribute(attr));
        item.modifiers = baseOpts.modifiers.map(mod => new Modifier(mod));
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
