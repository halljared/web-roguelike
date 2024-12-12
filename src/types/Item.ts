import { type IModifiableOptions, Modifiable } from "@/types/Modifiable";

export class Item extends Modifiable {
  constructor(baseOpts?: IModifiableOptions) {
    super(baseOpts);
  }

  public static serialize(item: Item): string {
    const base = Modifiable.baseJSON(item);
    return JSON.stringify({ base });
  }

  public static deserialize(input: string): Item | undefined {
    let item: Item | undefined = undefined;
    try {
      const parsed = JSON.parse(input);
      const baseOpts = Modifiable.deserializeBase(parsed);
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
