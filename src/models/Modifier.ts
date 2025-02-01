import { z } from 'zod';
import { type IModifiableConstructorOptions, Modifiable } from '@/models/Modifiable';
import { SerializedModifierSchema } from './schemas';
import { ModifierType, ModifiableTag, ModifierRarity } from './types';

export interface IModifierOptions {
  modifierType?: ModifierType;
  target?: ModifiableTag;
  rarity?: ModifierRarity;
}

export interface IModifierConstructorOptions
  extends IModifierOptions,
    IModifiableConstructorOptions {}

export class Modifier extends Modifiable {
  public modifierType: ModifierType;
  public target: ModifiableTag;
  public rarity: ModifierRarity;

  constructor(options: IModifierConstructorOptions = {}) {
    super(options);
    const {
      modifierType = ModifierType.ADDITIVE,
      target = ModifiableTag.STRENGTH,
      rarity = ModifierRarity.COMMON,
    } = options;
    this.modifierType = modifierType;
    this.target = target;
    this.rarity = rarity;
  }

  public static serialize(modifier: Modifier): string {
    const constructorOptions: IModifierConstructorOptions = {
      id: modifier.id,
      name: modifier.name,
      description: modifier.description,
      parentId: modifier.parentId,
      tags: modifier.tags,
      baseVal: modifier.baseVal,
      modifierType: modifier.modifierType,
      target: modifier.target,
      rarity: modifier.rarity,
    };

    return JSON.stringify(constructorOptions);
  }

  public static deserialize(input: string): Modifier | undefined {
    try {
      const parsed = SerializedModifierSchema.parse(JSON.parse(input));
      return new Modifier(parsed);
    } catch (e) {
      console.error('Error deserializing modifier:', e);
      return undefined;
    }
  }

  public static copy(modifier: Modifier, preserveId?: boolean): Modifier {
    const copiedModifier = Modifier.deserialize(Modifier.serialize(modifier)) as Modifier;
    if (!preserveId) {
      copiedModifier.id = crypto.randomUUID();
    }
    return copiedModifier;
  }
}
