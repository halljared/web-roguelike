import { z } from "zod";
import type { Attribute } from "@/models/Attribute";
import { type IModifierOptions, type Modifier } from "@/models/Modifier";
import { type IModifiableOptions, Modifiable } from "@/models/Modifiable";
import type { IGameObjectOptions } from "@/models/IGameObjectOptions";
import { SerializedModifiableGroupSchema } from "./schemas";

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
    let item: IModifiableGroupDeserialized | undefined = undefined;
    try {
      const parsed = SerializedModifiableGroupSchema.parse(obj);
      return parsed;
    } catch (e) {
      console.error("Schema validation error:", e);
      if (e instanceof z.ZodError) {
        console.error("Validation errors:", e.errors);
      }
      return undefined;
    }
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
