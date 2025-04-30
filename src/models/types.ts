export enum ModifiableTag {
  HEALTH = 'HEALTH',
  MANA = 'MANA',
  STRENGTH = 'STRENGTH',
  // ... other tags
}

export enum ModifierType {
  ADDITIVE = 'ADDITIVE',
  MULTIPLICATIVE = 'MULTIPLICATIVE',
  // ... other types
}

export enum ModifierRarity {
  COMMON = 'COMMON',
  RARE = 'RARE',
  EPIC = 'EPIC',
  LEGENDARY = 'LEGENDARY',
  GODLY = 'GODLY',
}

export interface IGenerateModifierOptions {
  rarity: ModifierRarity;
}

export interface IGenerateItemOptions {
  modifierOptions: IGenerateModifierOptions;
  numberOfModifiers: number;
}
