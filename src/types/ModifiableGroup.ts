import { z } from "zod";
import type { Attribute } from "@/types/Attribute";
import type { Modifier } from "@/types/Modifier";
import { ModifiableTag } from "@/types/Modifiable";
import { ModifierType } from "@/types/Modifier";

export interface IGameObjectOptions {
  id?: string;
  name: string;
  description: string;
}

export interface IModifiableGroupOptions {
  base: IGameObjectOptions & {
    attributes?: (IGameObjectOptions & {
      tags: ModifiableTag[];
      val: number;
    })[];
    modifiers?: (IGameObjectOptions & {
      tags: ModifiableTag[];
      val: number;
      mtype: ModifierType;
      target: ModifiableTag;
    })[];
  };
}

export abstract class ModifiableGroup implements IGameObjectOptions {
  public id: string;
  public name: string;
  public description: string;
  public attributes: Attribute[] = [];
  public modifiers: Modifier[] = [];

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

  protected static deserializeBase(obj: object): IModifiableGroupOptions | undefined {
    const IGameObjectOptionsSchema = z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
      }),
      AttributeSchema = IGameObjectOptionsSchema.extend({
        tags: z.array(z.nativeEnum(ModifiableTag)),
        val: z.number(),
      }), ModifierSchema = IGameObjectOptionsSchema.extend({
        tags: z.array(z.nativeEnum(ModifiableTag)),
        val: z.number(),
        mtype: z.nativeEnum(ModifierType),
        target: z.nativeEnum(ModifiableTag),
      }), BaseSchema = IGameObjectOptionsSchema.extend({
        attributes: z.array(AttributeSchema).optional(),
        modifiers: z.array(ModifierSchema).optional(),
      }), ModifiableGroupSchema = z.object({
        base: BaseSchema,
      });

    let item: IModifiableGroupOptions | undefined = undefined;
    try {
      item = ModifiableGroupSchema.parse(obj);
    } catch (e) {
      console.error(e);
    }
    return item;
  }


  protected static baseJSON(base: ModifiableGroup): object {
    return { ...base }
  }
}
