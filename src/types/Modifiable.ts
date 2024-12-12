import { z } from "zod";
import type { Attribute } from "@/types/Attribute";

export interface IModifiableOptions {
  id?: string;
  name: string;
  description: string;
}

export abstract class Modifiable implements IModifiableOptions {
  public id: string;
  public name: string;
  public description: string;
  public attributes: Attribute[] = [];

  protected constructor(
    baseOpts: IModifiableOptions = {
      name: "",
      description: "",
    }
  ) {
    const id = baseOpts.id;
    this.id = id ?? crypto.randomUUID();
    this.name = baseOpts.name;
    this.description = baseOpts.description;
  }

  protected static deserializeBase(obj: object): IModifiableOptions | undefined {
    const BaseSchema = z.object({
      base: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      })
    });
    let item: IModifiableOptions | undefined = undefined;
    try {
      const parsed = BaseSchema.parse(obj);
      item = parsed.base;
    } catch (e) {
      console.error(e);
    }
    return item;
  }

  protected static baseJSON(base: Modifiable): object {
    return { ...base }
  }
}
