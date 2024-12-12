import { type IModifiableBaseOptions, ModifiableBase } from "@/types/ModifiableBase";

export class Item extends ModifiableBase {
  constructor(baseOpts: IModifiableBaseOptions) {
    super(baseOpts);
  }

  public static serialize(item: Item): string {
    const base = ModifiableBase.baseJSON(item);
    return JSON.stringify({ base });
  }

  public static deserialize(input: string): Item | undefined {
    let item: Item | undefined = undefined;
    try {
      const parsed = JSON.parse(input);
      const baseOpts = ModifiableBase.deserializeBase(parsed);
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
