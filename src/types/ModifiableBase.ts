import { Modifier } from "@/types/Modifier";
import { z } from "zod";

export interface IModifiableBaseOptions {
  id?: string;
  name: string;
  description: string;
}

export abstract class ModifiableBase implements IModifiableBaseOptions {
  public id: string;
  public name: string;
  public description: string;
  public modifiables: ModifiableBase[] = [];
  public modifiers: Modifier[] = [];

  protected constructor(
    baseOpts: IModifiableBaseOptions
  ) {
    const id = baseOpts.id;
    this.id = id ?? crypto.randomUUID();
    this.name = baseOpts.name;
    this.description = baseOpts.description;
  }

  protected static deserializeBase(obj: object): IModifiableBaseOptions | undefined {
    const BaseSchema = z.object({
      base: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      })
    });
    let item: IModifiableBaseOptions | undefined = undefined;
    try {
      const parsed = BaseSchema.parse(obj);
      item = parsed.base;
    } catch (e) {
      console.error(e);
    }
    return item;
  }

  protected static baseJSON(base: ModifiableBase): object {
    return { ...base }
  }
}
