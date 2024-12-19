import { type IGameObjectOptions } from "@/types/ModifiableGroup";
import { Modifiable } from "@/types/Modifiable";

export enum ModifierType {
  ADDITIVE = 'ADDITIVE',
  MULTIPLICATIVE = 'MULTIPLICATIVE',
}

export class Modifier extends Modifiable {
  constructor(
    baseOpts?: IGameObjectOptions,
    public mtype: ModifierType = ModifierType.ADDITIVE,
  ) {
    super(baseOpts);
  }
}
