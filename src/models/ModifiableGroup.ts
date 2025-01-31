import { z } from "zod";
import type { Attribute } from "@/models/Attribute";
import {
  type IModifierOptions,
  type Modifier,
  ModifierType,
} from "@/models/Modifier";
import {
  type IModifiableOptions,
  Modifiable,
  ModifiableTag,
} from "@/models/Modifiable";
import type { IGameObjectOptions } from "@/models/IGameObjectOptions";

interface IRequiredGameObjectOptions extends Omit<IGameObjectOptions, "id"> {
  id: string;
}

export interface IModifiableGroupDeserialized {
  base: IRequiredGameObjectOptions & {
    attributes: (IRequiredGameObjectOptions & IModifiableOptions)[];
    modifiers: (IRequiredGameObjectOptions &
      IModifiableOptions &
      IModifierOptions)[];
  };
}

export interface IModifiableGroupOptions extends IGameObjectOptions {
  attributes: Attribute[];
  modifiers: Modifier[];
}

export abstract class ModifiableGroup implements IGameObjectOptions {
  public id: string;
  public name: string;
  public description: string;
  public attributes: Attribute[];
  public modifiers: Modifier[];
  public parentId: string;

  protected constructor(
    baseOpts: IModifiableGroupOptions = {
      name: "",
      description: "",
      attributes: [],
      modifiers: [],
    }
  ) {
    const { id, name, description, attributes, modifiers, parentId } = baseOpts;

    this.id = id ?? crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.attributes = attributes;
    this.modifiers = modifiers;
    this.parentId = parentId ?? "";
  }

  protected static deserializeBase(
    obj: object
  ): IModifiableGroupDeserialized | undefined {
    const IGameObjectOptionsSchema = z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        parentId: z.string(),
      }),
      IModifiableOptionsSchema = IGameObjectOptionsSchema.extend({
        tags: z.array(z.nativeEnum(ModifiableTag)),
        baseVal: z.number(),
      }),
      AttributeSchema = IModifiableOptionsSchema,
      ModifierSchema = IModifiableOptionsSchema.extend({
        modifierType: z.nativeEnum(ModifierType),
        target: z.nativeEnum(ModifiableTag),
      }),
      BaseSchema = IGameObjectOptionsSchema.extend({
        attributes: z.array(AttributeSchema),
        modifiers: z.array(ModifierSchema),
      }),
      ModifiableGroupSchema = z.object({
        base: BaseSchema,
      });

    let item: IModifiableGroupDeserialized | undefined = undefined;
    try {
      item = ModifiableGroupSchema.parse(obj);
    } catch (e) {
      console.error(e);
    }
    return item;
  }

  protected static baseJSON(base: ModifiableGroup): object {
    return { ...base };
  }

  public clearModifiables(): void {
    this.attributes = [];
    this.modifiers = [];
  }

  public getModifiables(): Modifiable[] {
    return [...this.attributes, ...this.modifiers];
  }
}
