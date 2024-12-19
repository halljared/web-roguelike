import { type IGameObjectOptions, ModifiableGroup } from "@/types/ModifiableGroup";
import { Attribute } from "@/types/Attribute";

export class Item extends ModifiableGroup {
  public modifiables: Attribute[] = [];

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
      const baseOpts = ModifiableGroup.deserializeBase(parsed);
      if (baseOpts) {
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
