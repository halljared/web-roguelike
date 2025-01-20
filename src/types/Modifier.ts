import { type IGameObjectOptions } from "@/types/ModifiableGroup";
import { type IModifiableOptions, Modifiable, ModifiableTag } from "@/types/Modifiable";

export enum ModifierType {
  ADDITIVE = 'ADDITIVE',
  MULTIPLICATIVE = 'MULTIPLICATIVE',
}

export class Modifier extends Modifiable {
  constructor(
    baseOpts?: IGameObjectOptions,
    modifiableOpts?: IModifiableOptions,
    public mtype: ModifierType = ModifierType.ADDITIVE,
    public target: ModifiableTag = ModifiableTag.STRENGTH
  ) {
    super(baseOpts, modifiableOpts);
  }
}
