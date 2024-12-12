import { type IModifiableOptions, Modifiable } from "@/types/Modifiable";

export enum ModifierType {
  ADDITIVE = 'ADDITIVE',
  MULTIPLICATIVE = 'MULTIPLICATIVE',
}

export class Modifier extends Modifiable {
  constructor(
    baseOpts?: IModifiableOptions,
    public mtype: ModifierType = ModifierType.ADDITIVE,
    public val: number = 1,
  ) {
    super(baseOpts);
  }
}
