export enum ModifierType {
  ADDITIVE = 'ADDITIVE',
  MULTIPLICATIVE = 'MULTIPLICATIVE',
}

export class Modifier {
  constructor(
    public mtype: ModifierType = ModifierType.ADDITIVE,
    public val: number = 1,
  ) {
  }
}
