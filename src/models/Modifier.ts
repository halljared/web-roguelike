import { z } from "zod";
import {
  type IModifiableConstructorOptions,
  Modifiable,
} from "@/models/Modifiable";
import { SerializedModifierSchema } from "./schemas";
import { ModifierType, ModifiableTag } from "./types";

export interface IModifierOptions {
  modifierType?: ModifierType;
  target?: ModifiableTag;
}

export interface IModifierConstructorOptions
  extends IModifierOptions,
    IModifiableConstructorOptions {}

export class Modifier extends Modifiable {
  public modifierType: ModifierType;
  public target: ModifiableTag;

  constructor(options: IModifierConstructorOptions = {}) {
    super(options);
    const {
      modifierType = ModifierType.ADDITIVE,
      target = ModifiableTag.STRENGTH,
    } = options;
    this.modifierType = modifierType;
    this.target = target;
  }

  public static serialize(modifier: Modifier): string {
    const base = {
      id: modifier.id,
      name: modifier.name,
      description: modifier.description,
      parentId: modifier.parentId,
      tags: modifier.tags,
      baseVal: modifier.baseVal,
      modifierType: modifier.modifierType,
      target: modifier.target,
    };
    return JSON.stringify({ base });
  }

  public static deserialize(input: string): Modifier | undefined {
    let modifier: Modifier | undefined = undefined;
    try {
      const parsed = SerializedModifierSchema.parse(JSON.parse(input));
      const { base } = parsed;

      modifier = new Modifier({
        id: base.id,
        name: base.name,
        description: base.description,
        parentId: base.parentId,
        tags: base.tags,
        baseVal: base.baseVal,
        modifierType: base.modifierType,
        target: base.target,
      });
    } catch (e) {
      console.error("Error deserializing modifier:", e);
    }
    return modifier;
  }

  public static copy(modifier: Modifier, preserveId?: boolean): Modifier {
    const copiedModifier = Modifier.deserialize(
      Modifier.serialize(modifier)
    ) as Modifier;
    if (!preserveId) {
      copiedModifier.id = crypto.randomUUID();
    }
    return copiedModifier;
  }
}
