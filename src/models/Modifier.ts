import {
  type IModifiableConstructorOptions,
  Modifiable,
  ModifiableTag
} from "@/models/Modifiable";

export enum ModifierType {
  ADDITIVE = 'ADDITIVE',
  MULTIPLICATIVE = 'MULTIPLICATIVE',
}

export interface IModifierOptions {
  modifierType?: ModifierType;
  target?: ModifiableTag;
}

export interface IModifierConstructorOptions extends IModifierOptions, IModifiableConstructorOptions {
}

export class Modifier extends Modifiable {
  public modifierType: ModifierType;
  public target: ModifiableTag;

  constructor(options: IModifierConstructorOptions = {}) {
    super(options);
    const { modifierType = ModifierType.ADDITIVE, target = ModifiableTag.STRENGTH } = options;
    this.modifierType = modifierType;
    this.target = target;
  }
}
