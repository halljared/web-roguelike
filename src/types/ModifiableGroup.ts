import { z } from "zod";
import type { Attribute } from "@/types/Attribute";
import type { Modifier } from "@/types/Modifier";

export interface IGameObjectOptions {
  id?: string;
  name: string;
  description: string;
}

export abstract class ModifiableGroup implements IGameObjectOptions {
  public id: string;
  public name: string;
  public description: string;
  public abstract attributes: Attribute[];
  public abstract modifiers: Modifier[];

  protected constructor(
    baseOpts: IGameObjectOptions = {
      name: "",
      description: "",
    }
  ) {
    const id = baseOpts.id;
    this.id = id ?? crypto.randomUUID();
    this.name = baseOpts.name;
    this.description = baseOpts.description;
  }

  protected static deserializeBase(obj: object): IGameObjectOptions | undefined {
    const BaseSchema = z.object({
      base: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      })
    });
    let item: IGameObjectOptions | undefined = undefined;
    try {
      const parsed = BaseSchema.parse(obj);
      item = parsed.base;
    } catch (e) {
      console.error(e);
    }
    return item;
  }

  protected static baseJSON(base: ModifiableGroup): object {
    return { ...base }
  }
}
